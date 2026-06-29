---
title: 存储数据与保存
description: storageData 的文件结构、显式保存机制、revision、冲突候选与多设备维护建议。
---

`storageData` 是 Snow Cues 的业务数据文件夹，也是唯一业务数据源。理解它的结构和保存机制，才能避免数据丢失。

## 文件结构

`storageData` 包含：

- `current.json`：当前正式数据。
- `revisions/`：历史快照（如 `storage-data-rev-000003.json`）。
- `drafts/`：用户手动导出的未保存草稿。
- `conflicts/`：保存冲突时生成的候选文件。

新建 `storageData` 默认生成 revision `1`，并写入初始 `current.json`。

## 显式保存

Snow Cues **不会在每次操作后自动写入业务文件**。所有业务操作只修改浏览器内存草稿。

保存必须由用户显式触发：

1. 点击「保存存储数据」。
2. 查看摘要 diff。
3. 确认保存。

空保存会被拒绝。保存前会重读 `current.json`，用打开时的 revision / hash 检测外部变化。

:::warning
不要把未保存的草稿当作已经落盘的数据。修改后请及时保存。
:::

## revision

存储数据有历史版本编号（revision）。保存时会生成新的 revision 文件，保留历史快照。

直接保存模式下，必须先写 `revisions/` 下的历史快照，成功后再更新 `current.json`。

## 冲突候选

如果保存时发现外部工具已经修改了 `current.json`，Snow Cues 会：

- **拒绝覆盖** `current.json`。
- 保留当前内存草稿。
- 把本次待保存结果写入 `conflicts/` 作为冲突候选文件。

你可以在系统工具中比较两个存储数据文件，再决定如何处理。比较工具只展示集合数量级摘要，**不自动合并或修改文件**，也不展示密文或隐私元数据全文。

## 保存包

浏览器不支持文件夹访问时，应用会提供新的 `current.json` 下载或 zip 保存包，由你手动放回同步文件夹。

- 桌面环境保存包可包含固定脚本模板，辅助把文件放回 `storageData`。
- 移动端保存包不包含可执行脚本，需按 README 手动放置文件。

应用不自动写入同步文件夹。

## 多设备维护

可以使用 Syncthing、Git 或其他外部工具管理 `storageData` 文件夹，但这些同步和冲突处理**不属于 Snow Cues 应用逻辑**。如果你计划使用 Syncthing 在多台设备之间同步，先阅读 [多设备同步](/docs/user/multi-device-sync/)。

建议：

- 每次修改后及时保存。
- 跨设备使用前确认同步已完成。
- 发生冲突时先比较文件，不要直接覆盖。
- 定期备份 `storageData`。

:::note
Syncthing、Git 同步和冲突自动合并不属于应用逻辑。应用内不实现同步功能。
:::

## 下一步

- 克隆与迁移：[克隆、导入与迁移](/docs/user/import-export-migration/)。
- 哪些数据会被保存：[安全与隐私](/docs/user/security-and-privacy/)。
- 使用 Syncthing 协作：[多设备同步](/docs/user/multi-device-sync/)。
