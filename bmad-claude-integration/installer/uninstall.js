#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const readline = require('readline');

class BMADUninstaller {
  constructor() {
    this.basePath = path.join(os.homedir(), '.bmad');
    this.configPath = path.join(os.homedir(), '.claude', 'config', 'settings.json');
    this.routersPath = path.join(os.homedir(), '.claude', 'routers');
    this.removedItems = [];
    this.errors = [];
  }

  async prompt(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.toLowerCase().trim());
      });
    });
  }

  async checkBMADInstallation() {
    console.log('🔍 Checking BMAD installation...\n');
    
    const checks = {
      dataDirectory: await this.exists(this.basePath),
      configFile: await this.exists(this.configPath),
      routers: await this.checkRouters(),
      hooks: await this.checkHooks()
    };

    const installed = Object.values(checks).some(v => v);
    
    if (!installed) {
      console.log('❌ No BMAD installation found.');
      return false;
    }

    console.log('Found BMAD components:');
    if (checks.dataDirectory) console.log('  ✓ Data directory:', this.basePath);
    if (checks.configFile) console.log('  ✓ Configuration in settings.json');
    if (checks.routers) console.log('  ✓ BMAD routers');
    if (checks.hooks) console.log('  ✓ BMAD hooks');
    console.log();

    return true;
  }

  async exists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async checkRouters() {
    try {
      const files = await fs.readdir(this.routersPath);
      return files.some(f => f.includes('bmad') || f.includes('-router.md'));
    } catch {
      return false;
    }
  }

  async checkHooks() {
    try {
      const config = await this.loadConfig();
      return config?.hooks && Object.keys(config.hooks).some(k => 
        config.hooks[k]?.some(h => h.includes('bmad'))
      );
    } catch {
      return false;
    }
  }

  async loadConfig() {
    try {
      const content = await fs.readFile(this.configPath, 'utf8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  async saveConfig(config) {
    const dir = path.dirname(this.configPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
  }

  async removeDataDirectory() {
    console.log('\n📁 Removing BMAD data directory...');
    
    if (await this.exists(this.basePath)) {
      try {
        // Check if there's important data
        const hasData = await this.checkForImportantData();
        if (hasData) {
          const backup = await this.prompt(
            '⚠️  Found session data. Create backup? (y/n): '
          );
          
          if (backup === 'y') {
            await this.createBackup();
          }
        }

        await fs.rm(this.basePath, { recursive: true, force: true });
        this.removedItems.push('Data directory');
        console.log('  ✓ Removed:', this.basePath);
      } catch (error) {
        this.errors.push(`Failed to remove data directory: ${error.message}`);
        console.error('  ❌ Error:', error.message);
      }
    } else {
      console.log('  ℹ️  No data directory found');
    }
  }

  async checkForImportantData() {
    try {
      const archivePath = path.join(this.basePath, 'archive');
      const sessionPath = path.join(this.basePath, 'queue', 'sessions');
      
      const hasArchive = await this.exists(archivePath);
      const hasSessions = await this.exists(sessionPath);
      
      return hasArchive || hasSessions;
    } catch {
      return false;
    }
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(os.homedir(), `bmad-backup-${timestamp}`);
    
    console.log(`  📦 Creating backup at: ${backupPath}`);
    
    try {
      await fs.cp(this.basePath, backupPath, { recursive: true });
      console.log('  ✓ Backup created successfully');
    } catch (error) {
      console.error('  ❌ Backup failed:', error.message);
    }
  }

  async removeRouters() {
    console.log('\n📋 Removing BMAD routers...');
    
    try {
      const files = await fs.readdir(this.routersPath);
      const bmadRouters = files.filter(f => 
        f.includes('bmad') || 
        ['pm-router.md', 'architect-router.md', 'dev-router.md', 'qa-router.md', 
         'ux-expert-router.md', 'sm-router.md', 'po-router.md', 'analyst-router.md'].includes(f)
      );

      for (const router of bmadRouters) {
        try {
          await fs.unlink(path.join(this.routersPath, router));
          this.removedItems.push(`Router: ${router}`);
          console.log(`  ✓ Removed: ${router}`);
        } catch (error) {
          this.errors.push(`Failed to remove router ${router}: ${error.message}`);
          console.error(`  ❌ Error removing ${router}:`, error.message);
        }
      }

      if (bmadRouters.length === 0) {
        console.log('  ℹ️  No BMAD routers found');
      }
    } catch (error) {
      console.log('  ℹ️  No routers directory found');
    }
  }

  async removeHooks() {
    console.log('\n🪝 Removing BMAD hooks from configuration...');
    
    try {
      const config = await this.loadConfig();
      let modified = false;

      if (config.hooks) {
        for (const [hookType, hooks] of Object.entries(config.hooks)) {
          if (Array.isArray(hooks)) {
            const filtered = hooks.filter(h => !h.includes('bmad'));
            if (filtered.length !== hooks.length) {
              config.hooks[hookType] = filtered;
              modified = true;
              console.log(`  ✓ Cleaned ${hookType} hooks`);
            }
          }
        }
      }

      // Remove BMAD-specific settings
      if (config.bmad) {
        delete config.bmad;
        modified = true;
        console.log('  ✓ Removed BMAD configuration');
      }

      if (modified) {
        await this.saveConfig(config);
        this.removedItems.push('Hook configurations');
      } else {
        console.log('  ℹ️  No BMAD hooks found');
      }
    } catch (error) {
      console.log('  ℹ️  No configuration file found');
    }
  }

  async removeFromPackageJson() {
    console.log('\n📦 Checking package.json for BMAD scripts...');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    
    try {
      const content = await fs.readFile(packagePath, 'utf8');
      const pkg = JSON.parse(content);
      let modified = false;

      // Remove BMAD scripts
      if (pkg.scripts) {
        const bmadScripts = Object.keys(pkg.scripts).filter(s => s.includes('bmad'));
        for (const script of bmadScripts) {
          delete pkg.scripts[script];
          modified = true;
          console.log(`  ✓ Removed script: ${script}`);
        }
      }

      // Remove BMAD dependencies (if any)
      if (pkg.dependencies?.['bmad-claude-integration']) {
        delete pkg.dependencies['bmad-claude-integration'];
        modified = true;
        console.log('  ✓ Removed BMAD dependency');
      }

      if (modified) {
        await fs.writeFile(packagePath, JSON.stringify(pkg, null, 2));
        this.removedItems.push('Package.json entries');
      } else {
        console.log('  ℹ️  No BMAD entries in package.json');
      }
    } catch {
      console.log('  ℹ️  No package.json found in current directory');
    }
  }

  async showSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Uninstall Summary');
    console.log('='.repeat(60) + '\n');

    if (this.removedItems.length > 0) {
      console.log('✅ Successfully removed:');
      this.removedItems.forEach(item => console.log(`  - ${item}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    console.log('\n💡 Post-uninstall notes:');
    console.log('  - Restart Claude Code for changes to take effect');
    console.log('  - Check ~/.claude/routers/ for any remaining custom routers');
    console.log('  - Your Claude Code installation remains intact');
    
    if (this.errors.length === 0) {
      console.log('\n✨ BMAD-METHOD has been successfully uninstalled!');
    } else {
      console.log('\n⚠️  Uninstall completed with some errors. Please check manually.');
    }
  }

  async run() {
    console.log('🗑️  BMAD-METHOD Claude Code Integration Uninstaller');
    console.log('='.repeat(60) + '\n');

    // Check if BMAD is installed
    const isInstalled = await this.checkBMADInstallation();
    if (!isInstalled) {
      return;
    }

    // Confirm uninstall
    console.log('⚠️  This will remove:');
    console.log('  - BMAD data directory (~/.bmad)');
    console.log('  - BMAD routers from Claude Code');
    console.log('  - BMAD hooks from settings.json');
    console.log('  - BMAD scripts from package.json\n');

    const confirm = await this.prompt('Are you sure you want to uninstall? (y/n): ');
    
    if (confirm !== 'y') {
      console.log('\n❌ Uninstall cancelled.');
      return;
    }

    // Perform uninstall
    await this.removeDataDirectory();
    await this.removeRouters();
    await this.removeHooks();
    await this.removeFromPackageJson();

    // Show summary
    await this.showSummary();
  }
}

// Run uninstaller if called directly
if (require.main === module) {
  const uninstaller = new BMADUninstaller();
  uninstaller.run().catch(error => {
    console.error('\n❌ Uninstall failed:', error.message);
    process.exit(1);
  });
}

module.exports = BMADUninstaller;