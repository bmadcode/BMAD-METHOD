# 如何通过Pull Request贡献

**刚接触GitHub和pull request？** 本指南将逐步引导您了解基础知识。

## 什么是Pull Request？

Pull request (PR) 是您在GitHub上向项目提议更改的方式。可以把它想象成说“这是我想要做的一些更改——请审查并考虑将它们添加到主项目中。”

## 开始之前

⚠️ **重要提示**：请保持您的贡献小而专注！我们更喜欢许多小的、清晰的更改，而不是一个巨大的更改。

**提交PR前需要：**

-   **对于错误修复**：使用[错误报告模板](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)创建一个issue
-   **对于新功能**：
    1.  在Discord的[#general-dev频道](https://discord.gg/gk8jAdXWmj)中讨论
    2.  使用[功能请求模板](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)创建一个issue
-   **对于大的更改**：始终先开一个issue来讨论对齐

## 分步指南

### 1. Fork存储库

1.  转到[BMad-Method存储库](https://github.com/bmadcode/bmad-method)
2.  点击右上角的“Fork”按钮
3.  这会创建您自己的项目副本

### 2. 克隆您的Fork

```bash
# 将YOUR-USERNAME替换为您的实际GitHub用户名
git clone https://github.com/YOUR-USERNAME/bmad-method.git
cd bmad-method
```

### 3. 创建一个新分支

**切勿直接在`main`分支上工作！** 始终为您的更改创建一个新分支：

```bash
# 创建并切换到一个新分支
git checkout -b fix/typo-in-readme
# 或
git checkout -b feature/add-new-agent
```

**分支命名技巧：**

-   `fix/description` - 用于错误修复
-   `feature/description` - 用于新功能
-   `docs/description` - 用于文档更改

### 4. 进行更改

-   编辑您想要更改的文件
-   保持更改小而专注
-   如果可能，测试您的更改

### 5. 提交您的更改

```bash
# 添加您的更改
git add .

# 用清晰的消息提交
git commit -m "Fix typo in README.md"
```

**好的提交消息：**

-   “修复安装说明中的拼写错误”
-   “为新代理用法添加示例”
-   “更新文档中的损坏链接”

**不好的提交消息：**

-   “东西”
-   “更改”
-   “更新”

### 6. 推送到您的Fork

```bash
# 将您的分支推送到您的fork
git push origin fix/typo-in-readme
```

### 7. 创建Pull Request

1.  在GitHub上转到您的fork
2.  您会看到一个绿色的“Compare & pull request”按钮 - 点击它
3.  选择正确的目标分支：
    -   **`next`分支**用于大多数贡献（功能、文档、增强）
    -   **`main`分支**仅用于关键修复
4.  使用CONTRIBUTING.md中的模板填写PR描述：
    -   **什么**：1-2句话描述更改了什么
    -   **为什么**：1-2句话解释原因
    -   **如何**：2-3个要点说明实现方式
    -   **测试**：您如何测试
5.  引用相关的issue编号（例如，“Fixes #123”）

### 8. 等待审查

-   维护人员将审查您的PR
-   他们可能会要求更改
-   请耐心并对反馈做出回应

## 什么是好的Pull Request？

✅ **好的PR：**

-   一次只更改一件事
-   有清晰、描述性的标题
-   在描述中解释了什么和为什么
-   仅包含需要更改的文件

❌ **避免：**

-   更改整个文件的格式
-   在一个PR中进行多个不相关的更改
-   将您的整个项目/存储库复制到PR中
-   没有解释的更改

## 要避免的常见错误

1.  **不要重新格式化整个文件** - 只更改必要的内容
2.  **不要包含不相关的更改** - 每个PR只专注于一个修复/功能
3.  **不要在issue中粘贴代码** - 创建一个合适的PR
4.  **不要提交您的整个项目** - 贡献具体的改进

## 需要帮助？

-   💬 加入我们的[Discord社区](https://discord.gg/gk8jAdXWmj)以获得实时帮助：
    -   **#general-dev** - 技术问题和功能讨论
    -   **#bugs-issues** - 在提交issue前获得有关错误的帮助
-   💬 在[GitHub Discussions](https://github.com/bmadcode/bmad-method/discussions)中提问
-   🐛 使用[错误报告模板](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)报告错误
-   💡 使用[功能请求模板](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)建议功能
-   📖 阅读完整的[贡献指南](../CONTRIBUTING.md)

## 示例：好的PR vs 坏的PR

### 😀 好的PR示例

**标题**：“修复安装指南的损坏链接”
**更改**：一个文件，一行更改
**描述**：“README.md中的链接指向了错误的文件。已更新为指向正确的安装指南。”

### 😞 坏的PR示例

**标题**：“更新”
**更改**：50个文件，整个代码库重新格式化
**描述**：“做了一些改进”

---

**请记住**：我们随时为您提供帮助！不要害怕提问。每个专家都曾经是初学者。
