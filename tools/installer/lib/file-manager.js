const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const yaml = require("js-yaml");
const chalk = require("chalk");
const { createReadStream, createWriteStream, promises: fsPromises } = require('fs');
const { pipeline } = require('stream/promises');
const resourceLocator = require('./resource-locator');

class FileManager {
  constructor() {
    this.manifestDir = ".bmad-core";
    this.manifestFile = "install-manifest.yaml";
  }

  async copyFile(source, destination) {
    try {
      await fs.ensureDir(path.dirname(destination));
      
      // Use streaming for large files (> 10MB)
      const stats = await fs.stat(source);
      if (stats.size > 10 * 1024 * 1024) {
        await pipeline(
          createReadStream(source),
          createWriteStream(destination)
        );
      } else {
        await fs.copy(source, destination);
      }
      return true;
    } catch (error) {
      console.error(chalk.red(`Failed to copy ${source}:`), error.message);
      return false;
    }
  }

  async copyDirectory(source, destination) {
    try {
      await fs.ensureDir(destination);
      
      // Use streaming copy for large directories
      const files = await resourceLocator.findFiles('**/*', {
        cwd: source,
        nodir: true
      });
      
      // Process files in batches to avoid memory issues
      const batchSize = 50;
      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        await Promise.all(
          batch.map(file => 
            this.copyFile(
              path.join(source, file),
              path.join(destination, file)
            )
          )
        );
      }
      return true;
    } catch (error) {
      console.error(
        chalk.red(`Failed to copy directory ${source}:`),
        error.message
      );
      return false;
    }
  }

  async copyGlobPattern(pattern, sourceDir, destDir, rootValue = null) {
    const files = await resourceLocator.findFiles(pattern, { cwd: sourceDir });
    const copied = [];

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);

      // Use root replacement if rootValue is provided and file needs it
      const needsRootReplacement = rootValue && (file.endsWith('.md') || file.endsWith('.yaml') || file.endsWith('.yml'));
      
      let success = false;
      if (needsRootReplacement) {
        success = await this.copyFileWithRootReplacement(sourcePath, destPath, rootValue);
      } else {
        success = await this.copyFile(sourcePath, destPath);
      }

      if (success) {
        copied.push(file);
      }
    }

    return copied;
  }

  async calculateFileHash(filePath) {
    try {
      // Use streaming for hash calculation to reduce memory usage
      const stream = createReadStream(filePath);
      const hash = crypto.createHash("sha256");
      
      for await (const chunk of stream) {
        hash.update(chunk);
      }
      
      return hash.digest("hex").slice(0, 16);
    } catch (error) {
      return null;
    }
  }

  async createManifest(installDir, config, files) {
    const manifestPath = path.join(
      installDir,
      this.manifestDir,
      this.manifestFile
    );

    // Read version from package.json
    let coreVersion = "unknown";
    try {
      const packagePath = path.join(__dirname, '..', '..', '..', 'package.json');
      const packageJson = require(packagePath);
      coreVersion = packageJson.version;
    } catch (error) {
      console.warn("Could not read version from package.json, using 'unknown'");
    }

    const manifest = {
      version: coreVersion,
      installed_at: new Date().toISOString(),
      install_type: config.installType,
      agent: config.agent || null,
      ides_setup: config.ides || [],
      expansion_packs: config.expansionPacks || [],
      files: [],
    };

    // Add file information
    for (const file of files) {
      const filePath = path.join(installDir, file);
      const hash = await this.calculateFileHash(filePath);

      manifest.files.push({
        path: file,
        hash: hash,
        modified: false,
      });
    }

    // Write manifest
    await fs.ensureDir(path.dirname(manifestPath));
    await fs.writeFile(manifestPath, yaml.dump(manifest, { indent: 2 }));

    return manifest;
  }

  async readManifest(installDir) {
    const manifestPath = path.join(
      installDir,
      this.manifestDir,
      this.manifestFile
    );

    try {
      const content = await fs.readFile(manifestPath, "utf8");
      return yaml.load(content);
    } catch (error) {
      return null;
    }
  }

  async readExpansionPackManifest(installDir, packId) {
    const manifestPath = path.join(
      installDir,
      `.${packId}`,
      this.manifestFile
    );

    try {
      const content = await fs.readFile(manifestPath, "utf8");
      return yaml.load(content);
    } catch (error) {
      return null;
    }
  }

  async checkModifiedFiles(installDir, manifest) {
    const modified = [];

    for (const file of manifest.files) {
      const filePath = path.join(installDir, file.path);
      const currentHash = await this.calculateFileHash(filePath);

      if (currentHash && currentHash !== file.hash) {
        modified.push(file.path);
      }
    }

    return modified;
  }

  async checkFileIntegrity(installDir, manifest) {
    const result = {
      missing: [],
      modified: []
    };

    for (const file of manifest.files) {
      const filePath = path.join(installDir, file.path);
      
      // Skip checking the manifest file itself - it will always be different due to timestamps
      if (file.path.endsWith('install-manifest.yaml')) {
        continue;
      }
      
      if (!(await this.pathExists(filePath))) {
        result.missing.push(file.path);
      } else {
        const currentHash = await this.calculateFileHash(filePath);
        if (currentHash && currentHash !== file.hash) {
          result.modified.push(file.path);
        }
      }
    }

    return result;
  }

  async backupFile(filePath) {
    const backupPath = filePath + ".bak";
    let counter = 1;
    let finalBackupPath = backupPath;

    // Find a unique backup filename
    while (await fs.pathExists(finalBackupPath)) {
      finalBackupPath = `${filePath}.bak${counter}`;
      counter++;
    }

    await fs.copy(filePath, finalBackupPath);
    return finalBackupPath;
  }

  async ensureDirectory(dirPath) {
    try {
      await fs.ensureDir(dirPath);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async pathExists(filePath) {
    return fs.pathExists(filePath);
  }

  async readFile(filePath) {
    return fs.readFile(filePath, "utf8");
  }

  async writeFile(filePath, content) {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content);
  }

  async removeDirectory(dirPath) {
    await fs.remove(dirPath);
  }

  async createExpansionPackManifest(installDir, packId, config, files) {
    const manifestPath = path.join(
      installDir,
      `.${packId}`,
      this.manifestFile
    );

    const manifest = {
      version: config.expansionPackVersion || require("../../../package.json").version,
      installed_at: new Date().toISOString(),
      install_type: config.installType,
      expansion_pack_id: config.expansionPackId,
      expansion_pack_name: config.expansionPackName,
      ides_setup: config.ides || [],
      files: [],
    };

    // Add file information
    for (const file of files) {
      const filePath = path.join(installDir, file);
      const hash = await this.calculateFileHash(filePath);

      manifest.files.push({
        path: file,
        hash: hash,
        modified: false,
      });
    }

    // Write manifest
    await fs.ensureDir(path.dirname(manifestPath));
    await fs.writeFile(manifestPath, yaml.dump(manifest, { indent: 2 }));

    return manifest;
  }

  async modifyCoreConfig(installDir, config) {
    const coreConfigPath = path.join(installDir, '.bmad-core', 'core-config.yaml');
    
    try {
      // Read the existing core-config.yaml
      const coreConfigContent = await fs.readFile(coreConfigPath, 'utf8');
      const coreConfig = yaml.load(coreConfigContent);
      
      // Modify sharding settings if provided
      if (config.prdSharded !== undefined) {
        coreConfig.prd.prdSharded = config.prdSharded;
      }
      
      if (config.architectureSharded !== undefined) {
        coreConfig.architecture.architectureSharded = config.architectureSharded;
      }
      
      // Write back the modified config
      await fs.writeFile(coreConfigPath, yaml.dump(coreConfig, { indent: 2 }));
      
      return true;
    } catch (error) {
      console.error(chalk.red(`Failed to modify core-config.yaml:`), error.message);
      return false;
    }
  }

  async copyFileWithRootReplacement(source, destination, rootValue) {
    try {
      // Check file size to determine if we should stream
      const stats = await fs.stat(source);
      
      if (stats.size > 5 * 1024 * 1024) { // 5MB threshold
        // Use streaming for large files
        const { Transform } = require('stream');
        const replaceStream = new Transform({
          transform(chunk, encoding, callback) {
            const modified = chunk.toString().replace(/\{root\}/g, rootValue);
            callback(null, modified);
          }
        });
        
        await this.ensureDirectory(path.dirname(destination));
        await pipeline(
          createReadStream(source, { encoding: 'utf8' }),
          replaceStream,
          createWriteStream(destination, { encoding: 'utf8' })
        );
      } else {
        // Regular approach for smaller files
        const content = await fsPromises.readFile(source, 'utf8');
        const updatedContent = content.replace(/\{root\}/g, rootValue);
        await this.ensureDirectory(path.dirname(destination));
        await fsPromises.writeFile(destination, updatedContent, 'utf8');
      }
      
      return true;
    } catch (error) {
      console.error(chalk.red(`Failed to copy ${source} with root replacement:`), error.message);
      return false;
    }
  }

  async copyDirectoryWithRootReplacement(source, destination, rootValue, fileExtensions = ['.md', '.yaml', '.yml']) {
    try {
      await this.ensureDirectory(destination);
      
      // Get all files in source directory
      const files = await resourceLocator.findFiles('**/*', { 
        cwd: source, 
        nodir: true 
      });
      
      let replacedCount = 0;
      
      for (const file of files) {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);
        
        // Check if this file type should have {root} replacement
        const shouldReplace = fileExtensions.some(ext => file.endsWith(ext));
        
        if (shouldReplace) {
          if (await this.copyFileWithRootReplacement(sourcePath, destPath, rootValue)) {
            replacedCount++;
          }
        } else {
          // Regular copy for files that don't need replacement
          await this.copyFile(sourcePath, destPath);
        }
      }
      
      if (replacedCount > 0) {
        console.log(chalk.dim(`  Processed ${replacedCount} files with {root} replacement`));
      }
      
      return true;
    } catch (error) {
      console.error(chalk.red(`Failed to copy directory ${source} with root replacement:`), error.message);
      return false;
    }
  }
}

module.exports = new FileManager();
