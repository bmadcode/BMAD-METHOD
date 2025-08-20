<!-- 由 BMAD™ Core 驱动 -->

# 文档分片任务

## 目的

-   根据二级章节将一个大文档分割成多个小文档
-   创建一个文件夹结构来组织分片后的文档
-   保持所有内容的完整性，包括代码块、图表和markdown格式

## 主要方法：使用markdown-tree自动进行

[[LLM: 首先，检查{root}/core-config.yaml中的markdownExploder是否设置为true。如果是，则尝试运行命令：`md-tree explode {input file} {output path}`。

如果命令成功，请通知用户文档已成功分片并停止 - 不要再继续。

如果命令失败（特别是出现命令未找到或不可用的错误），请通知用户：“markdownExploder设置已启用，但md-tree命令不可用。请：

1.  使用以下命令全局安装@kayvan/markdown-tree-parser：`npm install -g @kayvan/markdown-tree-parser`
2.  或者在{root}/core-config.yaml中将markdownExploder设置为false

**重要提示：在此处停止 - 在采取上述操作之一之前，不要继续手动分片。**”

如果markdownExploder设置为false，请通知用户：“markdownExploder设置当前为false。为了获得更好的性能和可靠性，您应该：

1.  在{root}/core-config.yaml中将markdownExploder设置为true
2.  使用以下命令全局安装@kayvan/markdown-tree-parser：`npm install -g @kayvan/markdown-tree-parser`

我现在将继续手动分片过程。”

然后仅在markdownExploder为false时才继续下面的手动方法。]]

### 安装和使用

1.  **全局安装**：

    ```bash
    npm install -g @kayvan/markdown-tree-parser
    ```

2.  **使用explode命令**：

    ```bash
    # 对于PRD
    md-tree explode docs/prd.md docs/prd

    # 对于架构
    md-tree explode docs/architecture.md docs/architecture

    # 对于任何文档
    md-tree explode [source-document] [destination-folder]
    ```

3.  **它的作用**：
    -   按二级章节自动分割文档
    -   创建正确命名的文件
    -   适当地调整标题级别
    -   处理所有带有代码块和特殊markdown的边缘情况

如果用户已安装@kayvan/markdown-tree-parser，请使用它并跳过下面的手动过程。

---

## 手动方法（如果@kayvan/markdown-tree-parser不可用或用户指示使用手动方法）

### 任务说明

1.  识别文档和目标位置

    -   确定要分片的文档（用户提供的路径）
    -   在`docs/`下创建一个与文档同名的新文件夹（不带扩展名）
    -   示例：`docs/prd.md` → 创建文件夹 `docs/prd/`

2.  解析和提取章节

关键的代理分片规则：

1.  读取整个文档内容
2.  识别所有二级章节（## 标题）
3.  对于每个二级章节：
    -   提取章节标题和直到下一个二级章节的所有内容
    -   包括所有子章节、代码块、图表、列表、表格等。
    -   要特别小心：
        -   围栏代码块（```） - 确保捕获完整的块，包括闭合的反引号，并考虑到实际上是围栏部分示例一部分的潜在误导性二级标题
        -   Mermaid图表 - 保留完整的图表语法
        -   嵌套的markdown元素
        -   可能在代码块中包含##的多行内容

关键：使用能够理解markdown上下文的正确解析。代码块内的##不是章节标题。]]

### 3. 创建单个文件

对于每个提取的章节：

1.  **生成文件名**：将章节标题转换为小写短横线格式
    -   删除特殊字符
    -   用短横线替换空格
    -   示例：“## Tech Stack” → `tech-stack.md`

2.  **调整标题级别**：
    -   在分片的新文档中，二级标题变为一级（# 而不是 ##）
    -   所有子章节级别减1：

    ```txt
     - ### → ##
     - #### → ###
     - ##### → ####
     - 等等。
    ```

3.  **写入内容**：将调整后的内容保存到新文件中

### 4. 创建索引文件

在分片文件夹中创建一个`index.md`文件，该文件：

1.  包含原始的一级标题和第一个二级章节之前的任何内容
2.  列出所有带有链接的分片文件：

```markdown
# 原始文档标题

[原始引言内容，如果有的话]

## 章节

- [章节名称 1](./section-name-1.md)
- [章节名称 2](./section-name-2.md)
- [章节名称 3](./section-name-3.md)
  ...
```

### 5. 保留特殊内容

1.  **代码块**：必须捕获完整的块，包括：

    ```language
    内容
    ```

2.  **Mermaid图表**：保留完整的语法：

    ```mermaid
    graph TD
    ...
    ```

3.  **表格**：保持正确的markdown表格格式

4.  **列表**：保留缩进和嵌套

5.  **内联代码**：保留反引号

6.  **链接和引用**：保持所有markdown链接的完整性

7.  **模板标记**：如果文档包含{{占位符}}，请完全保留

### 6. 验证

分片后：

1.  验证所有章节都已提取
2.  检查没有内容丢失
3.  确保标题级别已正确调整
4.  确认所有文件都已成功创建

### 7. 报告结果

提供摘要：

```text
文档分片成功：
- 来源：[原始文档路径]
- 目的地：docs/[文件夹名称]/
- 创建的文件：[数量]
- 章节：
  - section-name-1.md：“章节标题1”
  - section-name-2.md：“章节标题2”
  ...
```

## 重要说明

-   切勿修改实际内容，只调整标题级别
-   保留所有格式，包括重要的空白
-   处理包含##符号的代码块等边缘情况
-   确保分片是可逆的（可以从分片中重建原始文件）
