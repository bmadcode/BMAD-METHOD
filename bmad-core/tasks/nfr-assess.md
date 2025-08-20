<!-- 由 BMAD™ Core 驱动 -->

# nfr-assess

快速NFR验证，专注于四个核心：安全性、性能、可靠性、可维护性。

## 输入

```yaml
required:
  - story_id: '{epic}.{story}' # 例如, "1.3"
  - story_path: `bmad-core/core-config.yaml` 中的 `devStoryLocation`

optional:
  - architecture_refs: `bmad-core/core-config.yaml` 中的 `architecture.architectureFile`
  - technical_preferences: `bmad-core/core-config.yaml` 中的 `technicalPreferences`
  - acceptance_criteria: 来自故事文件
```

## 目的

评估故事的非功能性需求并生成：

1.  用于门禁文件的 `nfr_validation` 部分的YAML块
2.  保存到 `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md` 的简短markdown评估

## 流程

### 0. 输入缺失的故障安全

如果找不到story_path或故事文件：

-   仍然创建评估文件，并附注：“未找到源故事”
-   将所有选定的NFR设置为CONCERNS，并附注：“目标未知/证据缺失”
-   继续评估以提供价值

### 1. 启发范围

**交互模式：** 询问要评估哪些NFR
**非交互模式：** 默认为核心四个（安全性、性能、可靠性、可维护性）

```text
我应该评估哪些NFR？（输入数字或按Enter键使用默认值）
[1] 安全性 (默认)
[2] 性能 (默认)
[3] 可靠性 (默认)
[4] 可维护性 (默认)
[5] 可用性
[6] 兼容性
[7] 可移植性
[8] 功能适用性

> [按Enter键选择1-4]
```

### 2. 检查阈值

在以下位置查找NFR要求：

-   故事验收标准
-   `docs/architecture/*.md` 文件
-   `docs/technical-preferences.md`

**交互模式：** 询问缺失的阈值
**非交互模式：** 标记为CONCERNS，并附注：“目标未知”

```text
未找到性能要求。您的目标响应时间是多少？
> API调用为200毫秒

未找到安全要求。需要的身份验证方法是什么？
> 带刷新令牌的JWT
```

**未知目标策略：** 如果目标缺失且未提供，则将状态标记为CONCERNS，并附注：“目标未知”

### 3. 快速评估

对于每个选定的NFR，检查：

-   是否有证据表明它已实施？
-   我们能验证它吗？
-   是否有明显的差距？

### 4. 生成输出

## 输出1：门禁YAML块

仅为实际评估的NFR生成（无占位符）：

```yaml
# 门禁YAML（复制/粘贴）：
nfr_validation:
  _assessed: [security, performance, reliability, maintainability]
  security:
    status: CONCERNS
    notes: '认证端点上没有速率限制'
  performance:
    status: PASS
    notes: '已验证响应时间<200毫秒'
  reliability:
    status: PASS
    notes: '已实现错误处理和重试'
  maintainability:
    status: CONCERNS
    notes: '测试覆盖率为65%，目标为80%'
```

## 确定性状态规则

-   **FAIL**：任何选定的NFR存在严重差距或明确未达到目标
-   **CONCERNS**：没有FAIL，但任何NFR未知/部分/证据缺失
-   **PASS**：所有选定的NFR都已达到目标并有证据

## 质量分数计算

```
quality_score = 100
- 每个FAIL属性扣20分
- 每个CONCERNS属性扣10分
最低为0，最高为100
```

如果`technical-preferences.md`定义了自定义权重，则使用这些权重。

## 输出2：简短评估报告

**始终保存到：** `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md`

```markdown
# NFR评估：{epic}.{story}

日期：{date}
审查员：Quinn

<!-- 注意：未找到源故事（如果适用） -->

## 摘要

- 安全性：CONCERNS - 缺少速率限制
- 性能：PASS - 满足<200毫秒的要求
- 可靠性：PASS - 正确的错误处理
- 可维护性：CONCERNS - 测试覆盖率低于目标

## 关键问题

1.  **无速率限制**（安全性）
    -   风险：可能遭受暴力破解攻击
    -   修复：向认证端点添加速率限制中间件

2.  **测试覆盖率65%**（可维护性）
    -   风险：未经测试的代码路径
    -   修复：为未覆盖的分支添加测试

## 快速见效的修复

-   添加速率限制：约2小时
-   增加测试覆盖率：约4小时
-   添加性能监控：约1小时
```

## 输出3：故事更新行

**以该行结束，供审查任务引用：**

```
NFR评估：qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md
```

## 输出4：门禁集成行

**始终在末尾打印：**

```
门禁NFR块已准备好 → 粘贴到 qa.qaLocation/gates/{epic}.{story}-{slug}.yml 的 nfr_validation 下
```

## 评估标准

### 安全性

**PASS如果：**

-   已实现身份验证
-   已强制执行授权
-   存在输入验证
-   无硬编码机密

**CONCERNS如果：**

-   缺少速率限制
-   加密较弱
-   授权不完整

**FAIL如果：**

-   无身份验证
-   硬编码凭据
-   SQL注入漏洞

### 性能

**PASS如果：**

-   满足响应时间目标
-   无明显瓶颈
-   合理的资源使用

**CONCERNS如果：**

-   接近极限
-   缺少索引
-   无缓存策略

**FAIL如果：**

-   超过响应时间限制
-   内存泄漏
-   未优化的查询

### 可靠性

**PASS如果：**

-   存在错误处理
-   优雅降级
-   在需要时有重试逻辑

**CONCERNS如果：**

-   某些错误情况未处理
-   无断路器
-   缺少健康检查

**FAIL如果：**

-   无错误处理
-   出错时崩溃
-   无恢复机制

### 可维护性

**PASS如果：**

-   测试覆盖率达到目标
-   代码结构良好
-   存在文档

**CONCERNS如果：**

-   测试覆盖率低于目标
-   一些代码重复
-   缺少文档

**FAIL如果：**

-   无测试
-   代码高度耦合
-   无文档

## 快速参考

### 要检查的内容

```yaml
security:
  - 身份验证机制
  - 授权检查
  - 输入验证
  - 密钥管理
  - 速率限制

performance:
  - 响应时间
  - 数据库查询
  - 缓存使用
  - 资源消耗

reliability:
  - 错误处理
  - 重试逻辑
  - 断路器
  - 健康检查
  - 日志记录

maintainability:
  - 测试覆盖率
  - 代码结构
  - 文档
  - 依赖项
```

## 关键原则

-   默认专注于核心四个NFR
-   快速评估，而非深入分析
-   门禁就绪的输出格式
-   简短、可操作的发现
-   跳过不适用的内容
-   确定性状态规则以保持一致性
-   未知目标 → CONCERNS，而非猜测

---

## 附录：ISO 25010参考

<details>
<summary>完整的ISO 25010质量模型（点击展开）</summary>

### 所有8个质量特性

1.  **功能适用性**：完整性、正确性、适当性
2.  **性能效率**：时间行为、资源使用、容量
3.  **兼容性**：共存性、互操作性
4.  **可用性**：易学性、可操作性、可访问性
5.  **可靠性**：成熟度、可用性、容错性
6.  **安全性**：机密性、完整性、真实性
7.  **可维护性**：模块化、可重用性、可测试性
8.  **可移植性**：适应性、可安装性

在评估核心四个之外的内容时使用这些。

</details>

<details>
<summary>示例：深度性能分析（点击展开）</summary>

```yaml
performance_deep_dive:
  response_times:
    p50: 45ms
    p95: 180ms
    p99: 350ms
  database:
    slow_queries: 2
    missing_indexes: ['users.email', 'orders.user_id']
  caching:
    hit_rate: 0%
    recommendation: '为会话数据添加Redis'
  load_test:
    max_rps: 150
    breaking_point: 200 rps
```

</details>
