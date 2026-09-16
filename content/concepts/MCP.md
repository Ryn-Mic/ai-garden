---
title: MCP
type: concept
status: seedling
tags: [concept, agent, protocol]
aliases: [Model Context Protocol, 模型上下文协议]
---

# MCP

> [!abstract] 一句话定义
> Anthropic 提出的开放协议，用统一接口把外部工具、数据源接到 [[Agent]] 上——相当于 **AI 应用的 USB-C**。

## 为什么重要

在 MCP 之前，M 个模型 × N 个工具要写 M×N 套适配代码。MCP 把它压成 M+N：工具方实现一次 Server，模型方实现一次 Client。

## 核心原理

```text
Host（[[Claude-Code|Claude Code]] / [[Cursor]] 等）
  └── Client ──(JSON-RPC)──> MCP Server ──> 你的 API / 数据库 / 文件系统
```

### 三类原语

| 原语 | 谁控制 | 说明 |
| --- | --- | --- |
| Tools | 模型决定调用 | 可执行的动作，有副作用 |
| Resources | 应用决定加载 | 只读数据，类似文件 |
| Prompts | 用户主动触发 | 预设模板 |

### 传输方式

- `stdio`：本地进程，最常用，零网络配置
- `HTTP + SSE` / Streamable HTTP：远程共享

### 一个最小 Server 长什么样

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("demo")

@mcp.tool()
def add(a: int, b: int) -> int:
    """把两个整数相加。"""   # ← 这句 docstring 就是模型看到的工具描述，至关重要
    return a + b

if __name__ == "__main__":
    mcp.run()
```

> [!tip] 设计工具时的经验
> 工具描述（名字 + docstring + 参数说明）就是给模型的 [[提示工程]]。写成"什么时候用我、什么时候别用我"，比写清实现更有价值。

## 相关节点

- 服务对象：[[Agent]]
- 理解前提：[[提示工程]]
- 落地：[[Claude-Code|Claude Code]]、[[Cursor]]
- 项目想法：见 [[projects/index|实战项目]]
