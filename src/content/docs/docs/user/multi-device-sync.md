---
title: 多设备同步
description: 使用 Syncthing 在多台设备之间同步 Snow Cues 存储数据，并理解同步冲突、备份和安全边界。
---

Snow Cues 不提供后端账号或云同步。多设备使用时，推荐用 Syncthing 这类外部同步工具管理 `storageData` 文件夹。

Snow Cues 只负责读取、加密、保存业务数据；Syncthing 只负责把文件同步到你的其他设备。两者职责不同，不应混在一起理解。

## 同步的是什么

Syncthing 同步的是 `storageData` 文件夹本身，通常包括：

- `current.json`：当前正式数据。
- `revisions/`：历史快照。
- `drafts/`：手动导出的草稿。
- `conflicts/`：保存冲突时生成的候选文件。

Syncthing 不知道这些文件里的业务含义，也不会帮 Snow Cues 合并密码条目、迁移队列或空间配置。

## 推荐首次配置流程

首次配置多设备同步时，建议先在一台主设备上完成 Snow Cues 初始化。

1. 在主设备打开 Snow Cues。
2. 新建或打开 `storageData`。
3. 创建空间、设置空间主密码，并创建至少一条密码。
4. 点击「保存存储数据」，确认 `current.json` 已经落盘。
5. 将完整 `storageData` 文件夹放入 Syncthing 同步目录。
6. 等待其他设备完成同步。
7. 在其他设备打开 Snow Cues，并选择同步过来的同一份 `storageData`。
8. 使用同一个空间 ID、空间主密码和对应关键密钥验证数据可用。

:::tip
先完成一次可打开、可保存、可备份的主设备流程，再接入同步工具。这样更容易判断问题来自 Snow Cues 流程，还是来自外部同步状态。
:::

## 日常同步流程

日常使用时，核心原则是：先确认同步完成，再编辑；保存后等待同步完成，再去另一台设备继续使用。

推荐流程：

1. 打开设备前，确认 Syncthing 没有未完成的接收或发送任务。
2. 在 Snow Cues 中打开当前 `storageData`。
3. 完成创建、编辑、迁移或废弃等操作。
4. 点击「保存存储数据」，确认保存成功。
5. 等待 Syncthing 把修改同步到其他设备。
6. 到另一台设备使用前，再确认同步状态已经完成。

:::warning
不要在多台设备上同时编辑同一份 `storageData`。Snow Cues 会检测保存时的 revision / hash 变化并避免直接覆盖，但它不会自动合并两个设备上的业务修改。
:::

## 同步冲突怎么处理

如果同步工具或另一台设备在你保存前已经修改了 `current.json`，Snow Cues 会拒绝覆盖，并把当前待保存结果写入 `conflicts/`。

处理建议：

1. 先停止继续编辑，避免产生更多候选文件。
2. 确认每台设备上的 Syncthing 同步状态。
3. 使用 Snow Cues 的比较工具查看候选文件和当前文件的摘要差异。
4. 判断哪一份数据包含你需要保留的修改。
5. 不确定时，先复制完整 `storageData` 作为临时备份，再处理冲突。

:::caution
不要只凭文件修改时间删除冲突副本。冲突文件可能包含另一台设备上尚未合并的重要修改。
:::

## 同步不等于备份

Syncthing 会把文件状态同步到其他设备。这意味着误删、误覆盖或错误修改也可能被同步出去。

仍然建议保留独立备份：

- 定期复制完整 `storageData` 到不同位置。
- 在迁移、批量修改或处理冲突前先做一次备份。
- 不要把所有备份都放在同一个同步目录里。

## 安全边界

Syncthing 负责文件传输和设备同步；Snow Cues 负责数据加密和本地保存。使用 Syncthing 不会让 Snow Cues 获得云端账号，也不会让 Snow Cues 自动恢复空间主密码或关键密钥。

你仍然需要自己保管：

- 空间主密码。
- 每条密码的关键密钥。
- `storageData` 的备份。
- Syncthing 设备信任关系和同步目录权限。

## 下一步

- 理解 `storageData` 和冲突候选：[存储数据与保存](/docs/user/storage-data/)。
- 迁移设备或空间：[克隆、导入与迁移](/docs/user/import-export-migration/)。
- 理解安全边界：[安全与隐私](/docs/user/security-and-privacy/)。
