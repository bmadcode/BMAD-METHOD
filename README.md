# BMAD-METHOD™: 通用人工智能代理框架

[![版本](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![许可证: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 版本](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

代理式敏捷驱动开发的基础，被称为敏捷人工智能驱动开发的突破性方法，但远不止于此。利用专业的人工智能专业知识改变任何领域：软件开发、娱乐、创意写作、商业战略乃至个人健康等等。

**[在 YouTube 上订阅 BMadCode](https://www.youtube.com/@BMadCode?sub_confirmation=1)**

**[加入我们的 Discord 社区](https://discord.gg/gk8jAdXWmj)** - 一个不断壮大的人工智能爱好者社区！获取帮助、分享想法、探索人工智能代理和框架、协作开展技术项目、享受爱好并互相帮助取得成功。无论您是在 BMad 上遇到困难、构建自己的代理，还是只想聊聊最新的人工智能——我们都在这里为您服务！**某些移动设备和 VPN 加入 discord 可能会遇到问题，这是 discord 的问题 - 如果邀请不起作用，请尝试使用您自己的互联网或其他网络，或非 VPN。**

⭐ **如果您觉得这个项目有帮助或有用，请在右上角给它一颗星！** 这有助于其他人发现 BMAD-METHOD™，并且您会收到更新通知！

## 概述

**BMAD-METHOD™ 的两大关键创新：**

**1. 代理式规划：** 专门的代理（分析师、项目经理、架构师）与您协作，创建详细、一致的产品需求文档（PRD）和架构文档。通过先进的提示工程和人机回圈的优化，这些规划代理能够生成远远超出通用人工智能任务生成的全面规范。

**2. 上下文工程开发：** 然后，Scrum Master 代理将这些详细计划转化为超详细的开发故事，其中包含开发代理所需的一切——完整的上下文、实施细节和架构指导，直接嵌入到故事文件中。

这种两阶段方法消除了**规划不一致**和**上下文丢失**——这是人工智能辅助开发中最大的问题。您的开发代理打开一个故事文件，就能完全理解要构建什么、如何构建以及为什么构建。

**📖 [在用户指南中查看完整工作流程](docs/user-guide.md)** - 规划阶段、开发周期和所有代理角色

## 快速导航

### 理解 BMad 工作流程

**在深入之前，请查看这些解释 BMad 工作原理的关键工作流程图：**

1.  **[规划工作流程 (Web UI)](docs/user-guide.md#the-planning-workflow-web-ui)** - 如何创建 PRD 和架构文档
2.  **[核心开发周期 (IDE)](docs/user-guide.md#the-core-development-cycle-ide)** - SM、开发和 QA 代理如何通过故事文件进行协作

> ⚠️ **这些图表解释了 90% 的 BMad 方法代理式敏捷流程的困惑** - 理解 PRD+架构的创建以及 SM/开发/QA 工作流程以及代理如何通过故事文件传递笔记至关重要——这也解释了为什么这不是一个任务主管或只是一个简单的任务运行器！

### 您想做什么？

-   **[使用全栈敏捷人工智能团队安装和构建软件](#快速入门)** → 快速入门说明
-   **[学习如何使用 BMad](docs/user-guide.md)** → 完整的用户指南和演练
-   **[查看可用的人工智能代理](/bmad-core/agents))** → 您团队的专业角色
-   **[探索非技术用途](#-超越软件开发---扩展包)** → 创意写作、商业、健康、教育
-   **[创建我自己的人工智能代理](docs/expansion-packs.md)** → 为您的领域构建代理
-   **[浏览现成的扩展包](expansion-packs/)** → 游戏开发、DevOps、基础设施，并从想法和示例中获得灵感
-   **[理解架构](docs/core-architecture.md)** → 技术深入探讨
-   **[加入社区](https://discord.gg/gk8jAdXWmj)** → 获取帮助和分享想法

## 重要提示：保持您的 BMad 安装更新

**轻松保持最新状态！** 如果您的项目中已经安装了 BMAD-METHOD™，只需运行：

```bash
npx bmad-method install
# 或
git pull
npm run install:bmad
```

这将：

-   ✅ 自动检测您现有的 v4 安装
-   ✅ 仅更新已更改的文件并添加新文件
-   ✅为您所做的任何自定义修改创建 `.bak` 备份文件
-   ✅ 保留您特定于项目的配置

这使得在不丢失自定义设置的情况下，轻松受益于最新的改进、错误修复和新代理！

## 快速入门

### 一个命令搞定一切（IDE 安装）

**只需运行以下命令之一：**

```bash
npx bmad-method install
# 或明确使用稳定标签：
npx bmad-method@stable install
# 或者如果您已经安装了 BMad：
git pull
npm run install:bmad
```

这个单一命令处理：

-   **新安装** - 在您的项目中设置 BMad
-   **升级** - 自动更新现有安装
-   **扩展包** - 安装您已添加到 package.json 中的任何扩展包

> **就是这样！** 无论您是第一次安装、升级还是添加扩展包——这些命令都能搞定一切。

**先决条件**：需要 [Node.js](https://nodejs.org) v20+

### 最快入门：Web UI 全栈团队随时待命（2 分钟）

1.  **获取捆绑包**：保存或克隆[全栈团队文件](dist/teams/team-fullstack.txt)或选择另一个团队
2.  **创建人工智能代理**：创建一个新的 Gemini Gem 或 CustomGPT
3.  **上传和配置**：上传文件并设置说明：“您的关键操作说明已附上，请勿按指示打破角色”
4.  **开始构思和规划**：开始聊天！输入 `*help` 查看可用命令或选择像 `*analyst` 这样的代理立即开始创建简报。
5.  **关键**：随时在网络上与 BMad Orchestrator 交谈（#bmad-orchestrator 命令），并向它询问有关这一切如何运作的问题！
6.  **何时迁移到 IDE**：一旦您有了 PRD、架构、可选的 UX 和简报——就该切换到 IDE 来分片您的文档，并开始实施实际代码！有关更多详细信息，请参阅[用户指南](docs/user-guide.md)

### 替代方案：克隆和构建

```bash
git clone https://github.com/bmadcode/bmad-method.git
npm run install:bmad # 构建并安装所有内容到目标文件夹
```

## 🌟 超越软件开发 - 扩展包

BMAD™ 的自然语言框架适用于任何领域。扩展包为创意写作、商业战略、健康与保健、教育等领域提供专门的人工智能代理。此外，扩展包还可以通过并非适用于所有情况的特定功能来扩展核心 BMAD-METHOD™。[查看扩展包指南](docs/expansion-packs.md)并学习创建您自己的扩展包！

## 代码库扁平化工具

BMAD-METHOD™ 包括一个强大的代码库扁平化工具，旨在为人工智能模型消费准备您的项目文件。该工具将您的整个代码库聚合到一个 XML 文件中，使您可以轻松地与人工智能助手共享您的项目上下文，以进行分析、调试或开发辅助。

### 特性

-   **人工智能优化输出**：生成专为人工智能模型消费而设计的干净 XML 格式
-   **智能过滤**：自动遵循 `.gitignore` 模式以排除不必要的文件
-   **二进制文件检测**：智能识别和排除二进制文件，专注于源代码
-   **进度跟踪**：实时进度指示器和全面的完成统计数据
-   **灵活的输出**：可自定义的输出文件位置和命名

### 用法

```bash
# 基本用法 - 在当前目录中创建 flattened-codebase.xml
npx bmad-method flatten

# 指定自定义输入目录
npx bmad-method flatten --input /path/to/source/directory
npx bmad-method flatten -i /path/to/source/directory

# 指定自定义输出文件
npx bmad-method flatten --output my-project.xml
npx bmad-method flatten -o /path/to/output/codebase.xml

# 结合输入和输出选项
npx bmad-method flatten --input /path/to/source --output /path/to/output/codebase.xml
```

### 示例输出

该工具将显示进度并提供全面的摘要：

```text
📊 完成摘要：
✅ 成功将 156 个文件处理到 flattened-codebase.xml
📁 输出文件：/path/to/your/project/flattened-codebase.xml
📏 源文件总大小：2.3 MB
📄 生成的 XML 大小：2.1 MB
📝 总代码行数：15,847
🔢 估计令牌数：542,891
📊 文件分解：142 个文本文件，14 个二进制文件，0 个错误
```

生成的 XML 文件以结构化格式包含您项目的基于文本的源文件，人工智能模型可以轻松解析和理解，使其非常适合代码审查、架构讨论或在您的 BMAD-METHOD™ 项目中获得人工智能辅助。

#### 高级用法和选项

-   CLI 选项
    -   `-i, --input <path>`：要扁平化的目录。默认值：当前工作目录或在交互式运行时自动检测到的项目根目录。
    -   `-o, --output <path>`：输出文件路径。默认值：所选目录中的 `flattened-codebase.xml`。
-   交互模式
    -   如果您不传递 `--input` 和 `--output` 并且终端是交互式的（TTY），该工具将尝试检测您的项目根目录（通过查找像 `.git`、`package.json` 等标记）并提示您确认或覆盖路径。
    -   在非交互式上下文（例如 CI）中，它将静默地优先使用检测到的根目录；否则它会回退到当前目录和默认文件名。
-   文件发现和忽略
    -   在 git 存储库中时使用 `git ls-files` 以提高速度和正确性；否则回退到基于 glob 的扫描。
    -   应用您的 `.gitignore` 以及一组精选的默认忽略模式（例如，`node_modules`、构建输出、缓存、日志、IDE 文件夹、锁定文件、大型媒体/二进制文件、`.env*` 和以前生成的 XML 输出）。
-   二进制处理
    -   二进制文件被检测到并从 XML 内容中排除。它们在最终摘要中被计数，但未嵌入到输出中。
-   XML 格式和安全
    -   UTF-8 编码的文件，根元素为 `<files>`。
    -   每个文本文件都作为 `<file path="relative/path">` 元素发出，其内容包装在 `<![CDATA[ ... ]]>` 中。
    -   该工具通过拆分 CDATA 来安全地处理内容中出现的 `]]>`，以保持正确性。
    -   文件内容按原样保留，并在 XML 中缩进以便于阅读。
-   性能
    -   并发性根据您的 CPU 和工作负载大小自动选择。无需配置。
    -   在 git 存储库中运行可提高发现性能。

#### 最小 XML 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<files>
  <file path="src/index.js"><![CDATA[
    // 你的源代码内容
  ]]></file>
</files>
```

## 文档和资源

### 基本指南

-   📖 **[用户指南](docs/user-guide.md)** - 从项目开始到完成的完整演练
-   🏗️ **[核心架构](docs/core-architecture.md)** - 技术深入探讨和系统设计
-   🚀 **[扩展包指南](docs/expansion-packs.md)** - 将 BMad 扩展到软件开发之外的任何领域

## 支持

-   💬 [Discord 社区](https://discord.gg/gk8jAdXWmj)
-   🐛 [问题跟踪器](https://github.com/bmadcode/bmad-method/issues)
-   💬 [讨论](https://github.com/bmadcode/bmad-method/discussions)

## 贡献

**我们对贡献感到兴奋，并欢迎您的想法、改进和扩展包！** 🎉

📋 **[阅读 CONTRIBUTING.md](CONTRIBUTING.md)** - 完整的贡献指南，包括指南、流程和要求

## 许可证

MIT 许可证 - 有关详细信息，请参阅 [LICENSE](LICENSE)。

## 商标声明

BMAD™ 和 BMAD-METHOD™ 是 BMad Code, LLC 的商标。保留所有权利。

[![贡献者](https://contrib.rocks/image?repo=bmadcode/bmad-method)](https://github.com/bmadcode/bmad-method/graphs/contributors)

<sub>为人工智能辅助开发社区用 ❤️ 构建</sub>
