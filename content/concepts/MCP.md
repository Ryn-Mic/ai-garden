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

三个角色读一遍就懂：**Host** 是你正在用的那个应用；**Client** 是应用里负责「打电话」的部件；**Server** 是工具提供方写的一次性适配——写一次，所有支持 MCP 的 Agent 都能连它。你作为使用者，通常只做一件事：把 Server 的地址（或启动命令）填进客户端的配置里。

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

## 和 Skill、RAG 怎么分工

接上 MCP 只是扩展路线之一。Agent 想越用越强，靠的是三条路线各管一段：

| | 给 Agent 的是什么 | 类比 |
| --- | --- | --- |
| MCP | 能力（工具、数据源） | 接一双手 |
| [[Skill]] | 章法（流程、经验） | 发一本 SOP 手册 |
| [[RAG]] | 事实（资料、知识） | 往档案柜存文件 |

**MCP 管「能干什么」，Skill 管「怎么干好」，RAG 管「依据是什么」。**

顺带说清一个常见纠结：**什么时候不需要 MCP？** 如果工具只给自己内部的某个脚本用一次，直接在代码里 function call 就够了。MCP 的价值在**复用与生态**——工具写一次，处处可插。

## 相关节点

- 服务对象：[[Agent]]
- 姊妹篇：[[Skill]]（教方法）、[[RAG]]（喂知识）
- 理解前提：[[提示工程]]
- 落地：[[Claude-Code|Claude Code]]、[[Cursor]]
- 项目想法：见 [[projects/index|实战项目]]
