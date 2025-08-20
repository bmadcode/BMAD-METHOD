<!-- 由 BMAD™ Core 驱动 -->

# 测试设计

为故事实施创建具有适当测试级别建议的综合测试场景。

## 输入

```yaml
required:
  - story_id: '{epic}.{story}' # 例如, "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # 来自core-config.yaml的路径
  - story_title: '{title}' # 如果缺少，则从故事文件的H1派生
  - story_slug: '{slug}' # 如果缺少，则从标题派生（小写，连字符连接）
```

## 目的

设计一个完整的测试策略，确定要测试什么，在哪个级别（单元/集成/端到端），以及为什么。这确保了有效的测试覆盖，避免了冗余，同时保持了适当的测试边界。

## 依赖

```yaml
data:
  - test-levels-framework.md # 单元/集成/端到端决策标准
  - test-priorities-matrix.md # P0/P1/P2/P3分类系统
```

## 流程

### 1. 分析故事需求

将每个验收标准分解为可测试的场景。对于每个AC：

-   确定要测试的核心功能
-   确定需要的数据变体
-   考虑错误条件
-   注意边缘情况

### 2. 应用测试级别框架

**参考：** 加载`test-levels-framework.md`以获取详细标准

**快速规则：**

-   **单元**：纯逻辑、算法、计算
-   **集成**：组件交互、数据库操作
-   **端到端**：关键用户旅程、合规性

### 3. 分配优先级

**参考：** 加载`test-priorities-matrix.md`进行分类

**快速优先级分配：**

-   **P0**：收入关键、安全、合规
-   **P1**：核心用户旅程、常用
-   **P2**：次要功能、管理功能
-   **P3**：锦上添花、很少使用

### 4. 设计测试场景

对于每个已识别的测试需求，创建：

```yaml
test_scenario:
  id: '{epic}.{story}-{LEVEL}-{SEQ}'
  requirement: 'AC参考'
  priority: P0|P1|P2|P3
  level: unit|integration|e2e
  description: '正在测试的内容'
  justification: '为什么选择这个级别'
  mitigates_risks: ['RISK-001'] # 如果存在风险概况
```

### 5. 验证覆盖范围

确保：

-   每个AC至少有一个测试
-   跨级别没有重复的覆盖范围
-   关键路径有多个级别
-   风险缓解措施已得到处理

## 输出

### 输出1：测试设计文档

**保存到：** `qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md`

```markdown
# 测试设计：故事 {epic}.{story}

日期：{date}
设计者：Quinn（测试架构师）

## 测试策略概述

- 总测试场景：X
- 单元测试：Y (A%)
- 集成测试：Z (B%)
- 端到端测试：W (C%)
- 优先级分布：P0: X, P1: Y, P2: Z

## 按验收标准划分的测试场景

### AC1：{description}

#### 场景

| ID | 级别 | 优先级 | 测试 | 理由 |
| --- | --- | --- | --- | --- |
| 1.3-UNIT-001 | 单元 | P0 | 验证输入格式 | 纯验证逻辑 |
| 1.3-INT-001 | 集成 | P0 | 服务处理请求 | 多组件流程 |
| 1.3-E2E-001 | 端到端 | P1 | 用户完成旅程 | 关键路径验证 |

[继续所有AC...]

## 风险覆盖

[如果存在风险概况，则将测试场景映射到已识别的风险]

## 推荐的执行顺序

1.  P0单元测试（快速失败）
2.  P0集成测试
3.  P0端到端测试
4.  按顺序执行P1测试
5.  如果时间允许，则执行P2+

```

### 输出2：门禁YAML块

生成以包含在质量门禁中：

```yaml
test_design:
  scenarios_total: X
  by_level:
    unit: Y
    integration: Z
    e2e: W
  by_priority:
    p0: A
    p1: B
    p2: C
  coverage_gaps: [] # 列出任何没有测试的AC
```

### 输出3：跟踪参考

打印以供trace-requirements任务使用：

```text
测试设计矩阵：qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md
已识别的P0测试：{count}
```

## 质量清单

在最终确定之前，验证：

- [ ] 每个AC都有测试覆盖
- [ ] 测试级别是适当的（没有过度测试）
- [ ] 跨级别没有重复的覆盖范围
- [ ] 优先级与业务风险保持一致
- [ ] 测试ID遵循命名约定
- [ ] 场景是原子的和独立的

## 关键原则

-   **左移**：优先选择单元测试而非集成测试，集成测试而非端到端测试
-   **基于风险**：专注于可能出错的地方
-   **有效覆盖**：在正确的级别上测试一次
-   **可维护性**：考虑长期的测试维护
-   **快速反馈**：首先运行快速测试
