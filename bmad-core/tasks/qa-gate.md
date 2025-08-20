<!-- 由 BMAD™ Core 驱动 -->

# qa-gate

根据审查结果为故事创建或更新质量门禁决策文件。

## 目的

生成一个独立的质量门禁文件，提供明确的通过/失败决策和可操作的反馈。此门禁作为团队了解质量状态的咨询性检查点。

## 先决条件

-   故事已经过审查（手动或通过review-story任务）
-   审查结果可用
-   了解故事需求和实现

## 门禁文件位置

**始终**检查`bmad-core/core-config.yaml`中的`qa.qaLocation/gates`

**别名规则：**

-   转换为小写
-   用连字符替换空格
-   去除标点符号
-   示例：“User Auth - Login!”变为“user-auth-login”

## 最低要求的模式

```yaml
schema: 1
story: '{epic}.{story}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: '1-2句话解释门禁决策'
reviewer: 'Quinn'
updated: '{ISO-8601时间戳}'
top_issues: [] # 如果没有问题则为空数组
waiver: { active: false } # 仅在WAIVED时设置active: true
```

## 带有问题的模式

```yaml
schema: 1
story: '1.3'
gate: CONCERNS
status_reason: '认证端点上缺少速率限制，存在安全风险。'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'SEC-001'
    severity: high # 仅限：low|medium|high
    finding: '登录端点上没有速率限制'
    suggested_action: '在生产前添加速率限制中间件'
  - id: 'TEST-001'
    severity: medium
    finding: '认证流程没有集成测试'
    suggested_action: '添加集成测试覆盖'
waiver: { active: false }
```

## 豁免时的模式

```yaml
schema: 1
story: '1.3'
gate: WAIVED
status_reason: '为MVP版本接受了已知问题。'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'PERF-001'
    severity: low
    finding: '有1000+个项目时仪表板加载缓慢'
    suggested_action: '在下一个冲刺中实现分页'
waiver:
  active: true
  reason: 'MVP版本 - 性能优化已推迟'
  approved_by: '产品负责人'
```

## 门禁决策标准

### PASS

-   所有验收标准均已满足
-   没有高严重性问题
-   测试覆盖率符合项目标准

### CONCERNS

-   存在非阻塞性问题
-   应进行跟踪和安排
-   可以在知情的情况下继续进行

### FAIL

-   未满足验收标准
-   存在高严重性问题
-   建议返回到进行中状态

### WAIVED

-   问题已明确接受
-   需要批准和理由
-   尽管存在已知问题，仍继续进行

## 严重性等级

**固定值 - 无变体：**

-   `low`: 次要问题，外观问题
-   `medium`: 应尽快修复，非阻塞性
-   `high`: 严重问题，应阻止发布

## 问题ID前缀

-   `SEC-`: 安全问题
-   `PERF-`: 性能问题
-   `REL-`: 可靠性问题
-   `TEST-`: 测试差距
-   `MNT-`: 可维护性问题
-   `ARCH-`: 架构问题
-   `DOC-`: 文档差距
-   `REQ-`: 需求问题

## 输出要求

1.  **始终**在`bmad-core/core-config.yaml`中的`qa.qaLocation/gates`创建门禁文件
2.  **始终**将此确切格式附加到故事的QA结果部分：

    ```text
    Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
    ```

3.  将status_reason保持在最多1-2句话
4.  完全使用严重性值：`low`、`medium`或`high`

## 示例故事更新

创建门禁文件后，附加到故事的QA结果部分：

```markdown
## QA结果

### 审查日期：2025-01-12

### 审查员：Quinn（测试架构师）

[...现有审查内容...]

### 门禁状态

Gate: CONCERNS → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
```

## 关键原则

-   保持最小化和可预测性
-   固定的严重性等级（低/中/高）
-   始终写入标准路径
-   始终用门禁参考更新故事
-   清晰、可操作的发现
