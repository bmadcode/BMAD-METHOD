<!-- 由 BMAD™ Core 驱动 -->

# 应用QA修复

根据特定故事的QA结果（门禁和评估）实施修复。此任务供开发代理系统地使用QA输出并应用代码/测试更改，同时仅更新故事文件中允许的部分。

## 目的

-   读取故事的QA输出（门禁YAML + 评估markdown）
-   创建优先的、确定性的修复计划
-   应用代码和测试更改以弥补差距和解决问题
-   仅更新开发代理允许的故事部分

## 输入

```yaml
required:
  - story_id: '{epic}.{story}' # 例如, "2.2"
  - qa_root: 来自 `bmad-core/core-config.yaml` 键 `qa.qaLocation` (例如, `docs/project/qa`)
  - story_root: 来自 `bmad-core/core-config.yaml` 键 `devStoryLocation` (例如, `docs/project/stories`)

optional:
  - story_title: '{title}' # 如果缺少，则从故事的H1派生
  - story_slug: '{slug}' # 如果缺少，则从标题派生 (小写，连字符连接)
```

## 要读取的QA源

-   门禁 (YAML): `{qa_root}/gates/{epic}.{story}-*.yml`
    -   如果有多个，则使用修改时间最新的一个
-   评估 (Markdown):
    -   测试设计: `{qa_root}/assessments/{epic}.{story}-test-design-*.md`
    -   可追溯性: `{qa_root}/assessments/{epic}.{story}-trace-*.md`
    -   风险概况: `{qa_root}/assessments/{epic}.{story}-risk-*.md`
    -   非功能性需求评估: `{qa_root}/assessments/{epic}.{story}-nfr-*.md`

## 先决条件

-   仓库在本地构建和测试运行 (Deno 2)
-   可用的Lint和测试命令:
    -   `deno lint`
    -   `deno test -A`

## 流程 (不要跳过步骤)

### 0) 加载核心配置并定位故事

-   读取 `bmad-core/core-config.yaml` 并解析 `qa_root` 和 `story_root`
-   在 `{story_root}/{epic}.{story}.*.md` 中定位故事文件
    -   如果缺少，则停止并要求正确的故事ID/路径

### 1) 收集QA发现

-   解析最新的门禁YAML:
    -   `gate` (PASS|CONCERNS|FAIL|WAIVED)
    -   `top_issues[]` 包含 `id`, `severity`, `finding`, `suggested_action`
    -   `nfr_validation.*.status` 和注释
    -   `trace` 覆盖范围摘要/差距
    -   `test_design.coverage_gaps[]`
    -   `risk_summary.recommendations.must_fix[]` (如果存在)
-   读取任何存在的评估markdown并提取明确的差距/建议

### 2) 构建确定性修复计划 (按优先级顺序)

按顺序应用，优先级最高的优先：

1.  `top_issues` 中的高严重性项目 (安全/性能/可靠性/可维护性)
2.  NFR状态：所有FAIL必须修复 → 然后是CONCERNS
3.  测试设计 `coverage_gaps` (如果指定，则优先处理P0场景)
4.  Trace未覆盖的需求 (AC级别)
5.  风险 `must_fix` 建议
6.  中等严重性问题，然后是低严重性问题

指导：

-   在代码更改之前/同时，优先选择弥补覆盖差距的测试
-   保持更改最小化和有针对性；遵循项目架构和TS/Deno规则

### 3) 应用更改

-   根据计划实施代码修复
-   添加缺失的测试以弥补覆盖差距 (单元测试优先；根据AC要求进行集成测试)
-   通过 `deps.ts` 保持导入集中化 (参见 `docs/project/typescript-rules.md`)
-   遵循 `src/core/di.ts` 中的DI边界和现有模式

### 4) 验证

-   运行 `deno lint` 并修复问题
-   运行 `deno test -A` 直到所有测试通过
-   迭代直到干净

### 5) 更新故事 (仅限允许的部分)

关键：开发代理仅被授权更新故事文件的这些部分。不要修改任何其他部分 (例如, QA结果, 故事, 验收标准, 开发说明, 测试):

-   任务/子任务复选框 (将您添加的任何修复子任务标记为完成)
-   开发代理记录 →
    -   使用的代理模型 (如果更改)
    -   调试日志参考 (命令/结果, 例如, lint/tests)
    -   完成说明列表 (更改了什么, 为什么, 如何)
    -   文件列表 (所有添加/修改/删除的文件)
-   更改日志 (描述应用的修复的新的带日期的条目)
-   状态 (见下文规则)

状态规则：

-   如果门禁为PASS且所有已识别的差距都已弥补 → 设置 `Status: Ready for Done`
-   否则 → 设置 `Status: Ready for Review` 并通知QA重新运行审查

### 6) 不要编辑门禁文件

-   开发人员不修改门禁YAML。如果修复解决了问题，请请求QA重新运行 `review-story` 以更新门禁

## 阻塞条件

-   缺少 `bmad-core/core-config.yaml`
-   找不到 `story_id` 的故事文件
-   未找到QA工件 (门禁和评估都没有)
    -   停止并请求QA生成至少一个门禁文件 (或仅在有明确的开发人员提供的修复列表的情况下继续)

## 完成清单

-   deno lint: 0个问题
-   deno test -A: 所有测试通过
-   所有高严重性的 `top_issues` 已解决
-   NFR FAIL → 已解决; CONCERNS 已最小化或记录
-   覆盖差距已弥补或用理由明确记录
-   故事已更新 (仅限允许的部分)，包括文件列表和更改日志
-   状态已根据状态规则设置

## 示例：故事2.2

给定门禁 `docs/project/qa/gates/2.2-*.yml` 显示

-   `coverage_gaps`: 未测试返回操作行为 (AC2)
-   `coverage_gaps`: 未测试集中化依赖项强制执行 (AC4)

修复计划：

-   添加一个测试，确保工具包菜单的“返回”操作返回到主菜单
-   添加一个静态测试，验证服务/视图的导入通过 `deps.ts`
-   重新运行lint/tests并相应地更新开发代理记录 + 文件列表

## 关键原则

-   确定性的、风险优先的优先级排序
-   最小的、可维护的更改
-   测试验证行为并弥补差距
-   严格遵守允许的故事更新区域
-   门禁所有权仍归QA所有；开发通过状态信号表示准备就绪
