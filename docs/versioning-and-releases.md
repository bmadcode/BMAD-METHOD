# 版本控制和发布

BMad方法使用一个简化的发布系统，具有手动控制和自动生成发布说明的功能。

## 🚀 发布工作流

### 命令行发布（推荐）

创建带有精美发布说明的发布的最快方法：

```bash
# 预览发布内容
npm run preview:release

# 创建一个发布
npm run release:patch    # 5.1.0 → 5.1.1 (错误修复)
npm run release:minor    # 5.1.0 → 5.2.0 (新功能)
npm run release:major    # 5.1.0 → 6.0.0 (重大更改)

# 观察发布过程
npm run release:watch
```

### 一行命令发布

```bash
npm run preview:release && npm run release:minor && npm run release:watch
```

## 📝 自动发生的事情

当您触发发布时，GitHub Actions工作流会自动：

1.  ✅ **验证** - 运行测试、linting和格式检查
2.  ✅ **提升版本** - 更新`package.json`和安装程序版本
3.  ✅ **生成发布说明** - 将自上次发布以来的提交分类：
    -   ✨ **新功能** (`feat:`, `Feature:`)
    -   🐛 **错误修复** (`fix:`, `Fix:`)
    -   🔧 **维护** (`chore:`, `Chore:`)
    -   📦 **其他更改** (其他所有内容)
4.  ✅ **创建Git标签** - 标记发布版本
5.  ✅ **发布到NPM** - 带有`@latest`标签供用户安装
6.  ✅ **创建GitHub发布** - 带有格式化的发布说明

## 📋 示例发布说明

工作流会自动生成如下专业的发布说明：

````markdown
## 🚀 v5.2.0的新功能

### ✨ 新功能

- feat: 添加团队协作模式
- feat: 通过交互式提示增强CLI

### 🐛 错误修复

- fix: 解决安装路径问题
- fix: 处理代理加载中的边缘情况

### 🔧 维护

- chore: 更新依赖项
- chore: 改进错误消息

## 📦 安装

```bash
npx bmad-method install
```
````

**完整变更日志**: https://github.com/bmadcode/BMAD-METHOD/compare/v5.1.0...v5.2.0

````

## 🎯 用户安装

任何发布后，用户可以立即通过以下方式获取新版本：

```bash
npx bmad-method install    # 总是获取最新版本
```

## 📊 发布前预览

始终预览您的发布中将包含的内容：

```bash
npm run preview:release
```

这将显示：

-   自上次发布以来的提交
-   分类的更改
-   估计的下一个版本
-   发布说明预览

## 🔧 手动发布（GitHub UI）

您也可以通过GitHub Actions触发发布：

1.  转到**GitHub Actions** → **Manual Release**
2.  点击**"Run workflow"**
3.  选择版本提升类型（patch/minor/major）
4.  其他所有事情都会自动发生

## 📈 版本策略

-   **Patch** (5.1.0 → 5.1.1): 错误修复、次要改进
-   **Minor** (5.1.0 → 5.2.0): 新功能、增强
-   **Major** (5.1.0 → 6.0.0): 重大更改、重大重新设计

## 🛠️ 开发工作流

1.  **自由开发** - 将PR合并到main而不会触发发布
2.  **测试未发布的更改** - 克隆存储库以测试最新的main分支
3.  **准备好后发布** - 使用命令行或GitHub Actions来发布
4.  **用户获取更新** - 通过简单的`npx bmad-method install`命令

这使您可以完全控制何时发布，同时自动化所有繁琐的部分，如版本提升、发布说明和发布。

## 🔍 故障排除

### 检查发布状态

```bash
gh run list --workflow="Manual Release"
npm view bmad-method dist-tags
git tag -l | sort -V | tail -5
```

### 查看最新发布

```bash
gh release view --web
npm view bmad-method versions --json
```

### 如果需要版本同步

如果发布后您的本地文件与已发布版本不匹配：

```bash
./tools/sync-version.sh    # 自动将本地文件与npm最新版本同步
```

### 如果发布失败

-   检查GitHub Actions日志：`gh run view <run-id> --log-failed`
-   验证NPM令牌是否已配置
-   确保分支保护允许工作流推送
````
