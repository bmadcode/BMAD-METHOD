<!-- 由 BMAD™ Core 驱动 -->

# review-story

执行全面的测试架构审查并做出质量门禁决策。这种自适应、风险感知的审查会创建一个故事更新和一个详细的门禁文件。

## 输入

```yaml
required:
  - story_id: '{epic}.{story}' # 例如, "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # 来自core-config.yaml的路径
  - story_title: '{title}' # 如果缺少，则从故事文件的H1派生
  - story_slug: '{slug}' # 如果缺少，则从标题派生 (小写，连字符连接)
```

## 先决条件

-   故事状态必须是“待审查”
-   开发人员已完成所有任务并更新了文件列表
-   所有自动化测试均已通过

## 审查流程 - 自适应测试架构

### 1. 风险评估（决定审查深度）

**在以下情况下自动升级为深度审查：**

-   触及了认证/支付/安全文件
-   故事中没有添加任何测试
-   差异 > 500行
-   上一个门禁是FAIL/CONCERNS
-   故事有 > 5个验收标准

### 2. 综合分析

**A. 需求可追溯性**

-   将每个验收标准映射到其验证测试（用Given-When-Then记录映射，而非测试代码）
-   识别覆盖差距
-   验证所有需求都有相应的测试用例

**B. 代码质量审查**

-   架构和设计模式
-   重构机会（并执行它们）
-   代码重复或效率低下
-   性能优化
-   安全漏洞
-   遵守最佳实践

**C. 测试架构评估**

-   在适当级别上的测试覆盖率是否足够
-   测试级别的适当性（什么是单元测试、集成测试、端到端测试）
-   测试设计的质量和可维护性
-   测试数据管理策略
-   模拟/桩的使用是否适当
-   边缘情况和错误场景的覆盖
-   测试执行时间和可靠性

**D. 非功能性需求（NFR）**

-   安全性：认证、授权、数据保护
-   性能：响应时间、资源使用
-   可靠性：错误处理、恢复机制
-   可维护性：代码清晰度、文档

**E. 可测试性评估**

-   可控性：我们能控制输入吗？
-   可观察性：我们能观察输出吗？
-   可调试性：我们能轻松调试失败吗？

**F. 技术债务识别**

-   累积的捷径
-   缺失的测试
-   过时的依赖项
-   违反架构

### 3. 主动重构

-   在安全和适当的情况下重构代码
-   运行测试以确保更改不会破坏功能
-   在QA结果部分记录所有更改，并附上清晰的“为什么”和“如何”
-   不要修改QA结果部分之外的故事内容
-   不要更改故事状态或文件列表；仅建议下一个状态

### 4. 标准合规性检查

-   验证是否遵守`docs/coding-standards.md`
-   检查是否符合`docs/unified-project-structure.md`
-   根据`docs/testing-strategy.md`验证测试方法
-   确保遵守故事中提到的所有准则

### 5. 验收标准验证

-   验证每个AC是否已完全实现
-   检查是否有任何缺失的功能
-   验证边缘情况是否已处理

### 6. 文档和注释

-   验证代码在可能的情况下是否是自文档化的
-   如果缺少，为复杂逻辑添加注释
-   确保任何API更改都已记录

## 输出1：仅更新故事文件 - QA结果部分

**关键**：您仅被授权更新故事文件的“QA结果”部分。请勿修改任何其他部分。

**QA结果锚点规则：**

-   如果`## QA结果`不存在，则在文件末尾追加它
-   如果存在，则在现有条目下方追加一个新的带日期的条目
-   切勿编辑其他部分

审查和任何重构后，将您的结果附加到故事文件的QA结果部分：

```markdown
## QA结果

### 审查日期：[日期]

### 审查员：Quinn（测试架构师）

### 代码质量评估

[对实施质量的总体评估]

### 执行的重构

[列出您执行的任何重构并附上解释]

-   **文件**：[文件名]
    -   **更改**：[更改了什么]
    -   **原因**：[更改原因]
    -   **方式**：[它如何改进代码]

### 合规性检查

-   编码标准：[✓/✗] [如有说明]
-   项目结构：[✓/✗] [如有说明]
-   测试策略：[✓/✗] [如有说明]
-   所有AC均已满足：[✓/✗] [如有说明]

### 改进清单

[勾选您自己处理的项目，未勾选的留给开发人员处理]

-   [x] 为更好的错误处理重构了用户服务 (services/user.service.ts)
-   [x] 添加了缺失的边缘情况测试 (services/user.service.test.ts)
-   [ ] 考虑将验证逻辑提取到单独的验证器类中
-   [ ] 为错误场景添加集成测试
-   [ ] 为新的错误代码更新API文档

### 安全审查

[发现的任何安全问题以及是否已解决]

### 性能考虑

[发现的任何性能问题以及是否已解决]

### 审查期间修改的文件

[如果您修改了文件，请在此处列出 - 要求开发人员更新文件列表]

### 门禁状态

Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
Risk profile: qa.qaLocation/assessments/{epic}.{story}-risk-{YYYYMMDD}.md
NFR assessment: qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md

# 注意：路径应引用core-config.yaml以获取自定义配置

### 推荐状态

[✓ 准备完成] / [✗ 需要更改 - 见上方未勾选项目]
（故事所有者决定最终状态）
```

## 输出2：创建质量门禁文件

**模板和目录：**

-   从`../templates/qa-gate-tmpl.yaml`渲染
-   在`qa.qaLocation/gates`中创建目录（参见`bmad-core/core-config.yaml`），如果不存在
-   保存到：`qa.qaLocation/gates/{epic}.{story}-{slug}.yml`

门禁文件结构：

```yaml
schema: 1
story: '{epic}.{story}'
story_title: '{story title}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: '1-2句话解释门禁决策'
reviewer: 'Quinn (测试架构师)'
updated: '{ISO-8601时间戳}'

top_issues: [] # 如果没有问题则为空
waiver: { active: false } # 仅在WAIVED时设置active: true

# 扩展字段（可选但推荐）：
quality_score: 0-100 # 100 - (20*FAILs) - (10*CONCERNS) 或使用technical-preferences.md权重
expires: '{ISO-8601时间戳}' # 通常为审查后2周

evidence:
  tests_reviewed: { count }
  risks_identified: { count }
  trace:
    ac_covered: [1, 2, 3] # 有测试覆盖的AC编号
    ac_gaps: [4] # 缺少覆盖的AC编号

nfr_validation:
  security:
    status: PASS|CONCERNS|FAIL
    notes: '具体发现'
  performance:
    status: PASS|CONCERNS|FAIL
    notes: '具体发现'
  reliability:
    status: PASS|CONCERNS|FAIL
    notes: '具体发现'
  maintainability:
    status: PASS|CONCERNS|FAIL
    notes: '具体发现'

recommendations:
  immediate: # 生产前必须修复
    - action: '添加速率限制'
      refs: ['api/auth/login.ts']
  future: # 以后可以解决
    - action: '考虑缓存'
      refs: ['services/data.ts']
```

### 门禁决策标准

**确定性规则（按顺序应用）：**

如果存在risk_summary，则首先应用其阈值（≥9 → FAIL，≥6 → CONCERNS），然后是NFR状态，然后是top_issues严重性。

1.  **风险阈值（如果存在risk_summary）：**
    -   如果任何风险评分≥9 → Gate = FAIL（除非豁免）
    -   否则如果任何评分≥6 → Gate = CONCERNS

2.  **测试覆盖差距（如果trace可用）：**
    -   如果缺少任何来自test-design的P0测试 → Gate = CONCERNS
    -   如果缺少安全/数据丢失P0测试 → Gate = FAIL

3.  **问题严重性：**
    -   如果任何`top_issues.severity == high` → Gate = FAIL（除非豁免）
    -   否则如果任何`severity == medium` → Gate = CONCERNS

4.  **NFR状态：**
    -   如果任何NFR状态为FAIL → Gate = FAIL
    -   否则如果任何NFR状态为CONCERNS → Gate = CONCERNS
    -   否则 → Gate = PASS

-   WAIVED仅在waiver.active: true并有理由/批准者时

详细标准：

-   **PASS**：所有关键要求均已满足，没有阻塞性问题
-   **CONCERNS**：存在非关键问题，团队应审查
-   **FAIL**：应解决的关键问题
-   **WAIVED**：问题已确认但团队明确豁免

### 质量分数计算

```text
quality_score = 100 - (20 × FAIL数量) - (10 × CONCERNS数量)
范围在0到100之间
```

如果`technical-preferences.md`定义了自定义权重，则使用这些权重。

### 建议的所有者约定

对于`top_issues`中的每个问题，包括一个`suggested_owner`：

-   `dev`：需要代码更改
-   `sm`：需要澄清需求
-   `po`：需要业务决策

## 关键原则

-   您是一名提供全面质量评估的测试架构师
-   在适当时，您有权直接改进代码
-   始终解释您的更改以供学习
-   在完美与实用之间取得平衡
-   专注于基于风险的优先级排序
-   提供具有明确所有权的可操作建议

## 阻塞条件

如果出现以下情况，请停止审查并请求澄清：

-   故事文件不完整或缺少关键部分
-   文件列表为空或明显不完整
-   在需要时不存在测试
-   代码更改与故事需求不符
-   需要讨论的关键架构问题

## 完成

审查后：

1.  更新故事文件中的QA结果部分
2.  在`qa.qaLocation/gates`的目录中创建门禁文件
3.  推荐状态：“准备完成”或“需要更改”（所有者决定）
4.  如果修改了文件，请在QA结果中列出并要求开发人员更新文件列表
5.  始终提供建设性反馈和可操作的建议
