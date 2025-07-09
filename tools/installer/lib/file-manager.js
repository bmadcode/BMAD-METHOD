const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const glob = require("glob");
const yaml = require("js-yaml");

// Dynamic import for ES module
let chalk;

// Initialize ES modules
async function initializeModules() {
  if (!chalk) {
    chalk = (await import("chalk")).default;
  }
}

class FileManager {
  constructor() {
    this.manifestDir = ".bmad-core";
    this.manifestFile = "install-manifest.yaml";
  }

  async copyFile(source, destination) {
    try {
      await fs.ensureDir(path.dirname(destination));
      await fs.copy(source, destination);
      return true;
    } catch (error) {
      await initializeModules();
      console.error(chalk.red(`Failed to copy ${source}:`), error.message);
      return false;
    }
  }

  async copyDirectory(source, destination) {
    try {
      await fs.ensureDir(destination);
      await fs.copy(source, destination);
      return true;
    } catch (error) {
      await initializeModules();
      console.error(
        chalk.red(`Failed to copy directory ${source}:`),
        error.message
      );
      return false;
    }
  }

  async copyGlobPattern(pattern, sourceDir, destDir, rootValue = null) {
    const files = glob.sync(pattern, { cwd: sourceDir });
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
      const content = await fs.readFile(filePath);
      return crypto
        .createHash("sha256")
        .update(content)
        .digest("hex")
        .slice(0, 16);
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

    // Read version from core-config.yaml
    const coreConfigPath = path.join(__dirname, "../../../bmad-core/core-config.yaml");
    let coreVersion = "unknown";
    try {
      const coreConfigContent = await fs.readFile(coreConfigPath, "utf8");
      const coreConfig = yaml.load(coreConfigContent);
      coreVersion = coreConfig.version || "unknown";
    } catch (error) {
      console.warn("Could not read version from core-config.yaml, using 'unknown'");
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
      await initializeModules();
      console.error(chalk.red(`Failed to modify core-config.yaml:`), error.message);
      return false;
    }
  }

  async copyFileWithRootReplacement(source, destination, rootValue) {
    try {
      // Read the source file content
      const fs = require('fs').promises;
      const content = await fs.readFile(source, 'utf8');
      
      // Replace {root} with the specified root value
      const updatedContent = content.replace(/\{root\}/g, rootValue);
      
      // Ensure directory exists
      await this.ensureDirectory(path.dirname(destination));
      
      // Write the updated content
      await fs.writeFile(destination, updatedContent, 'utf8');
      
      return true;
    } catch (error) {
      await initializeModules();
      console.error(chalk.red(`Failed to copy ${source} with root replacement:`), error.message);
      return false;
    }
  }

  async copyDirectoryWithRootReplacement(source, destination, rootValue, fileExtensions = ['.md', '.yaml', '.yml']) {
    try {
      await initializeModules(); // Ensure chalk is initialized
      await this.ensureDirectory(destination);
      
      // Get all files in source directory
      const files = glob.sync('**/*', { 
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
      await initializeModules();
      console.error(chalk.red(`Failed to copy directory ${source} with root replacement:`), error.message);
      return false;
    }
  }
}

module.exports = new FileManager();
