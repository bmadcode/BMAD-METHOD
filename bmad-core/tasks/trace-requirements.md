<!-- 由 BMAD™ Core 驱动 -->

# 跟踪需求

使用Given-When-Then模式将故事需求映射到测试用例，以实现全面的可追溯性。

## 目的

创建一个需求可追溯性矩阵，确保每个验收标准都有相应的测试覆盖。此任务有助于识别测试中的差距，并确保所有需求都得到验证。

**重要提示**：此处使用Given-When-Then来记录需求和测试之间的映射，而不是编写实际的测试代码。测试应遵循您项目的测试标准（测试代码中不使用BDD语法）。

## 先决条件

-   具有明确验收标准的故事文件
-   访问测试文件或测试规范
-   理解实现

## 可追溯性流程

### 1. 提取需求

从以下来源识别所有可测试的需求：

-   验收标准（主要来源）
-   用户故事陈述
-   具有特定行为的任务/子任务
-   提到的非功能性需求
-   记录的边缘情况

### 2. 映射到测试用例

对于每个需求，记录哪些测试对其进行验证。使用Given-When-Then描述测试验证的内容（而不是如何编写）：

```yaml
requirement: 'AC1：用户可以使用有效凭据登录'
test_mappings:
  - test_file: 'auth/login.test.ts'
    test_case: '应该使用有效的电子邮件和密码成功登录'
    # Given-When-Then描述测试验证的内容，而不是如何编码
    given: '一个具有有效凭据的注册用户'
    when: '他们提交登录表单'
    then: '他们被重定向到仪表板并创建了会话'
    coverage: full

  - test_file: 'e2e/auth-flow.test.ts'
    test_case: '完整的登录流程'
    given: '用户在登录页面上'
    when: '输入有效凭据并提交'
    then: '仪表板加载用户数据'
    coverage: integration
```

### 3. 覆盖率分析

评估每个需求的覆盖率：

**覆盖级别：**

-   `full`：需求已完全测试
-   `partial`：部分方面已测试，存在差距
-   `none`：未找到测试覆盖
-   `integration`：仅在集成/端到端测试中覆盖
-   `unit`：仅在单元测试中覆盖

### 4. 差距识别

记录发现的任何差距：

```yaml
coverage_gaps:
  - requirement: 'AC3：密码重置邮件在60秒内发送'
    gap: '没有测试邮件发送时间'
    severity: medium
    suggested_test:
      type: integration
      description: '测试邮件服务SLA合规性'

  - requirement: 'AC5：支持1000个并发用户'
    gap: '未实现负载测试'
    severity: high
    suggested_test:
      type: performance
      description: '使用1000个并发连接进行负载测试'
```

## 输出

### 输出1：门禁YAML块

**生成用于粘贴到门禁文件的`trace`下：**

```yaml
trace:
  totals:
    requirements: X
    full: Y
    partial: Z
    none: W
  planning_ref: 'qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md'
  uncovered:
    - ac: 'AC3'
      reason: '未找到密码重置时间的测试'
  notes: '参见 qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md'
```

### 输出2：可追溯性报告

**保存到：** `qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md`

创建具有以下内容的可追溯性报告：

```markdown
# 需求可追溯性矩阵

## 故事：{epic}.{story} - {title}

### 覆盖率摘要

- 总需求数：X
- 完全覆盖：Y (Z%)
- 部分覆盖：A (B%)
- 未覆盖：C (D%)

### 需求映射

#### AC1：{验收标准1}

**覆盖率：FULL**

Given-When-Then映射：

-   **单元测试**：`auth.service.test.ts::validateCredentials`
    -   Given：有效的用户凭据
    -   When：调用验证方法
    -   Then：返回true和用户对象

-   **集成测试**：`auth.integration.test.ts::loginFlow`
    -   Given：具有有效帐户的用户
    -   When：调用登录API
    -   Then：返回JWT令牌并创建会话

#### AC2：{验收标准2}

**覆盖率：PARTIAL**

[继续所有AC...]

### 关键差距

1.  **性能要求**
    -   差距：没有针对并发用户的负载测试
    -   风险：高 - 可能在生产负载下失败
    -   措施：使用k6或类似工具实施负载测试

2.  **安全要求**
    -   差距：未测试速率限制
    -   风险：中 - 潜在的DoS漏洞
    -   措施：向集成套件添加速率限制测试

### 测试设计建议

根据发现的差距，建议：

1.  需要额外的测试场景
2.  要实施的测试类型（单元/集成/端到端/性能）
3.  测试数据要求
4.  模拟/桩策略

### 风险评估

-   **高风险**：没有覆盖的需求
-   **中风险**：仅部分覆盖的需求
-   **低风险**：具有完整单元+集成覆盖的需求
```

## 可追溯性最佳实践

### 使用Given-When-Then进行映射（而非测试代码）

使用Given-When-Then记录每个测试验证的内容：

**Given**：测试设置的初始上下文

-   测试准备的状态/数据
-   模拟的用户上下文
-   系统先决条件

**When**：测试执行的操作

-   测试执行的内容
-   测试的API调用或用户操作
-   触发的事件

**Then**：测试断言的内容

-   验证的预期结果
-   检查的状态更改
-   验证的值

**注意**：这仅用于文档记录。实际的测试代码遵循您项目的标准（例如，describe/it块，无BDD语法）。

### 覆盖优先级

根据以下内容确定覆盖优先级：

1.  关键业务流程
2.  与安全相关的需求
3.  数据完整性需求
4.  面向用户的功能
5.  性能SLA

### 测试粒度

在适当的级别上进行映射：

-   业务逻辑的单元测试
-   组件交互的集成测试
-   用户旅程的端到端测试
-   NFR的性能测试

## 质量指标

良好的可追溯性显示：

-   每个AC至少有一个测试
-   关键路径有多个测试级别
-   明确覆盖了边缘情况
-   NFR有适当的测试类型
-   每个测试都有清晰的Given-When-Then

## 危险信号

注意：

-   没有测试覆盖的AC
-   未映射到需求的测试
-   模糊的测试描述
-   缺少边缘情况覆盖
-   没有特定测试的NFR

## 与质量门的集成

这种可追溯性为质量门提供信息：

-   严重差距 → FAIL
-   次要差距 → CONCERNS
-   缺少来自test-design的P0测试 → CONCERNS

### 输出3：故事钩子行

**打印此行以供审查任务引用：**

```text
跟踪矩阵：qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md
```

-   完全覆盖 → PASS贡献

## 关键原则

-   每个需求都必须是可测试的
-   使用Given-When-Then以求清晰
-   识别存在和缺失
-   基于风险进行优先级排序
-   使建议可操作
