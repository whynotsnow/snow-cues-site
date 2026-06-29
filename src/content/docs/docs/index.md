---
title: Snow Cues 用户文档
description: 从第一次使用到自部署、多设备同步、备份和安全边界的用户侧文档入口。
---

欢迎来到 Snow Cues 用户文档。

Snow Cues 是一个纯浏览器运行、本地优先的密码派生与数据管理工具。它不提供后端账号、云端同步或自动恢复服务；你需要自己管理空间主密码、关键密钥和导出备份。

推荐直接使用官方 HTTPS 部署，并在 Chrome、Edge 等 Chromium 系浏览器中运行。你也可以自部署静态产物到自己信任的 HTTPS 环境。

官网只分发静态前端代码。你的 `storageData`、空间主密码、关键密钥和外部平台密码，全部留在你自己手里。

## 推荐阅读顺序

1. [产品总览](/docs/user/overview/)
2. [快速开始](/docs/user/quick-start/)
3. [使用路径](/docs/user/usage-paths/)
4. [核心概念](/docs/user/core-concepts/)
5. [安全与隐私](/docs/user/security-and-privacy/)
6. [常见问题](/docs/user/faq/)

## 按主题浏览

- **日常使用**：[工作方式](/docs/user/how-it-works/)、[密码条目](/docs/user/password-entries/)、[记忆提示](/docs/user/memory-hints/)、[密码组与输出适配](/docs/user/password-groups/)、[游离密码](/docs/user/detached-password/)、[多设备同步](/docs/user/multi-device-sync/)
- **数据与安全**：[存储数据与保存](/docs/user/storage-data/)、[克隆、导入与迁移](/docs/user/import-export-migration/)、[安全与隐私](/docs/user/security-and-privacy/)、[自部署](/docs/user/self-hosting/)、[安全性与便利性的取舍](/docs/user/security-convenience-tradeoffs/)
- **参考**：[常见问题](/docs/user/faq/)、[术语表](/docs/user/glossary/)

## 文档定位

这里的文档面向最终用户，重点解释如何使用、如何理解风险、如何迁移和备份。Snow Cues 的安全边界建立在少保存、显式保存和浏览器原生 WebCrypto 上——文档会明确说明系统保存什么、不保存什么，以及为什么推荐 Chromium 系浏览器。
