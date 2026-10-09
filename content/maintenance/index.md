---
title: 维护与写作
description: 知识库作者的内容规范、Obsidian、同步与部署入口
tags: [moc, maintenance]
track: meta
aliases: [resources/维护与写作, resources/index, projects/index]
---

# 维护与写作

**作者入口，不是 AI 学习路线。** 建站、写作与发布集中放在这里，不混入普通用户的操作课程。

## 写作与目录约定

- [[maintenance/内容分层与写作规范|内容分层与写作规范]]：正文按类型收纳，系列按顺序引用；分级、证据与模板约定。
- [[series/index|系列阅读]]：检查读者从哪一站进入、途中补哪些知识。

## 站点维护

- [[maintenance/Obsidian配置指南|Obsidian 配置指南]]：打开 Vault、模板与写作设置。
- [[maintenance/多端同步与发布流程|多端同步与发布流程]]：Gitee 写作源、内容副本与发布的关系。
- [[maintenance/Quartz部署指南|Quartz 部署指南]]：构建与部署，需要 Node.js / Git 环境。
- [[maintenance/ai-garden|AI Garden 项目记录]]：本库的架构、现状与维护计划。

> [!warning] 迁移也需要同步回写作源
> 本地 `content/` 是 Gitee 写作仓库的副本。目录迁移、正文和 `aliases` 都需要按既有流程同步回写作源，否则后续同步可能覆盖它们。构建成功不等于已同步或已发布。

`templates/` 是作者模板，`assets/` 是图片与练习材料；它们不是阅读路线。
