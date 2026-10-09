---
title: MCP 的接入与调用机制
type: research
status: growing
track: research
audience: developer
difficulty: advanced
tags: [research, mcp, protocol, track/research, level/advanced]
prerequisites: ["[[concepts/MCP|MCP]]", "[[concepts/Agent|Agent]]", "Python 与客户端配置基础"]
verification: docs-only
updated: 2026-09-30
aliases: ["research/MCP的接入与调用机制"]
---

# MCP 的接入与调用机制

> [!info] 阅读定位
> **进阶研究 · 技术研究**。面向理解工具接入或编写服务端的读者。普通用户选用说明见 [[concepts/MCP|MCP]]、[[toolbox/mcp/网页读取MCP|网页读取MCP]]。

## 研究问题与边界

连接一个 MCP Server 后，谁发现工具、谁决定调用、谁执行、谁把结果放进模型输入？

本文整理职责边界与一个 Python SDK 风格的示例，不绑定某个协议版本的全部报文，也未在本库完成客户端联调。协议细节随版本演进，需核对实际宿主与 SDK。

## 参与者：应用不是模型本身

<iframe src="/diagrams/mcp-call-sequence.html" width="100%" height="800" frameborder="0" style="border: 1px solid #ddd; border-radius: 8px;"></iframe>

*MCP 完整调用链路：从用户请求到最终响应的时序图*

```text
用户
  ↓ 任务与授权
AI 应用（Host）
  ├── 模型调用：任务、规则、工具说明、已有结果
  └── MCP 客户端（Client）
          ↕ 协议通信
      MCP 服务端（Server）
          ↕ 实际调用
      API / 文件系统 / 数据库 / 其他能力
```

- **Host**：管理任务、连接、授权、输入组装与模型调用。
- **Client**：在应用侧与服务端通信；Host 可以管理多个连接。
- **Server**：按协议暴露能力，把请求映射到真实系统操作。
- **模型**：基于被提供的信息提出动作或回答；通常不直接运行 MCP 服务端源码。

MCP 统一的是连接和交互接口，**没有规定所有应用必须怎样规划任务、加载 Skill 或管理模型上下文**。

## 一次工具调用通常经过哪些阶段

1. **配置与建立连接**：按所用传输方式连接服务，处理版本和能力兼容。具体流程以双方实现为准。
2. **发现并暴露工具**：客户端获取工具说明，宿主决定全部提供、过滤或按需发现。
3. **选择并校验请求**：模型提出调用及参数；应用按权限与审批策略处理。
4. **执行并返回结果**：服务端调用实际系统，返回内容或错误；应用可能截断、转换或筛选。
5. **进入后续推理**：宿主把处理后的结果用于模型下一轮回答或继续执行。

所以，连接成功不等于工具已暴露，工具已暴露不等于已调用，返回数据也不等于模型这次利用了所有内容。

## Tools、Resources、Prompts 是三种不同入口

| 原语 | 常见使用方式 | 不应误解为 |
| --- | --- | --- |
| Tools | 模型可提出的调用，宿主执行并施加权限控制 | 所有工具都有写副作用，或模型直接拥有权限 |
| Resources | 由客户端 / 应用获取的数据与上下文 | 服务端所有资源都自动进入模型 |
| Prompts | 用户可选择的提示模板入口 | 与原生 Agent Skill 的发现加载完全等价 |

这些是交互设计中的常见控制方式；应用仍决定如何展示和接入。MCP Prompt 和 Skill 都可承载工作说明，但接口、包装和触发机制不是同一件事。

## 传输方式与部署成本

- **stdio**：应用启动本地进程，通过标准输入输出通信；仍有运行环境、程序来源与本地文件权限问题。
- **Streamable HTTP**：通过 HTTP 与服务通信，适合远程或共享服务；需要额外考虑认证、网络范围与运维。

旧服务可能采用其他或历史传输方式。不要把旧教程中的 HTTP + SSE 与当前 Streamable HTTP 无条件当成相同配置。

标准接口降低重复适配成本，不保证认证方式、原语支持和客户端策略完全通用。

## 一个最小服务端示例

下面保留一个 Python SDK `FastMCP` 风格示例，展示“函数怎样成为工具”，**不是无需依赖即可运行的完整安装教程**：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """把两个整数相加，不执行网络请求或文件操作。"""
    return a + b

if __name__ == "__main__":
    mcp.run()
```

需要支持对应 API 的 Python MCP SDK。实际依赖版本、启动与客户端接入按 [官方 SDK](https://github.com/modelcontextprotocol/python-sdk) 核对。

类型和说明帮助构建工具定义，但宿主可以进一步改写、裁剪或筛选。应确认最终暴露给模型的工具名、描述和参数结构，而不是只看源码 docstring。

### 最小联调验收

在本地测试环境连接后：

- 能发现 `add` 及两个整数参数。
- 实际调用 `a=2, b=3`，工具返回 `5`。
- 记录可证明这次调用执行过，而非模型直接心算回答 `5`。
- 非法参数得到受控错误；客户端能显示错误而不是谎报成功。

本文尚未完成这些联调项，因此证据等级保持 `docs-only`。仅语法检查不能升级为“实测接入成功”。

## 安全需要落在多个层次

- **宿主层**：限制可用工具、设置审批、记录参数与结果。
- **服务端与业务层**：校验参数、用户身份和对象权限；模型输出不是授权凭证。
- **系统与网络层**：限制文件目录、外网与内网范围；只读也可能泄露数据。
- **任务与内容层**：把网页、文件和工具结果视为不可信材料，不能让其中的文字产生新的授权。

改变状态的操作还要考虑重试、幂等、重复执行和审计。停止或取消 Agent，不会自动回滚已经执行的业务操作。

## 与 Skill、RAG 的关系

[[concepts/Skill|Skill]] 指导如何组织工作；MCP 暴露外部入口；[[concepts/RAG|RAG]] 负责检索资料并进入生成上下文。一个 RAG 查询可以被包装为 MCP 工具，一个 Skill 也可以要求使用它。

因此，“流程、连接、事实”是帮助理解的分工，不是三者之间不可交叉的硬边界。

## 参考

- [MCP 架构概览](https://modelcontextprotocol.io/docs/learn/architecture)、[规范](https://modelcontextprotocol.io/specification/latest)。
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)、[参考服务](https://github.com/modelcontextprotocol/servers)。
- [[research/analysis/Skill的加载机制与遵循边界|Skill的加载机制与遵循边界]]、[[concepts/上下文工程|上下文工程]]、[[concepts/Agent|Agent]]。

<!-- series-navigation:start -->
## 系列导航

- **系列 04 · 3/4 站**：下一站 → [[research/comparisons/Agent框架对比|第 4 站]]；[[series/04-Agent机制与可靠性|查看本系列顺序与补课点]]。
<!-- series-navigation:end -->
