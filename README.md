# Snow Cues Docs Site

Snow Cues 的用户侧文档与落地页站点，作为独立 Astro 项目维护。

## 项目简介

Snow Cues 是一个纯浏览器运行、本地优先的密码派生与加密存储系统。本仓库承载其对外文档站点与落地页（landing page），不包含产品应用代码（应用部署在 `https://cues.whynotsnow.com/`）。

站点包含两部分：

- **落地页**（`/`）：手写 Astro 页面，介绍产品定位、核心特性与工作流。
- **用户文档**（`/docs/`）：基于 Starlight 的文档站点，包含产品总览、快速开始、核心概念、日常使用、数据安全与参考共 14 个页面。

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Astro v6 |
| 文档主题 | @astrojs/starlight v0.40 |
| 内容格式 | Markdown（Starlight frontmatter） |
| 样式方案 | 手写 CSS（无 Tailwind），自定义设计系统 |
| 字体 | Inter（无衬线正文）+ Fira Code（等宽代码） |
| 搜索 | Pagefind（Starlight 内置） |
| 类型检查 | TypeScript 5.7（仅用于配置文件类型校验） |
| 部署目标 | 纯静态 HTML，适合 GitHub Pages / Cloudflare Pages |

## 项目结构

```text
snow-cues-site/
├── astro.config.mjs          # Astro + Starlight 集成配置（侧边栏、本地化）
├── package.json              # 依赖与脚本
├── tsconfig.json             # TypeScript 配置（继承 astro/tsconfigs/strict）
├── README.md                 # 项目维护说明（本文件）
├── agents.md                 # AI 编码助手指南
│
└── src/
    ├── content.config.ts     # Starlight 内容集合定义（docsLoader + docsSchema）
    │
    ├── pages/
    │   └── index.astro       # 落地页（手写 Astro 组件，含内联 JS）
    │
    ├── content/docs/docs/    # 用户文档（Markdown）
    │   ├── index.md          # 文档首页 / 入口
    │   └── user/
    │       ├── overview.md             # 产品总览
    │       ├── quick-start.md          # 快速开始
    │       ├── core-concepts.md        # 核心概念
    │       ├── how-it-works.md         # 工作方式
    │       ├── password-entries.md     # 密码条目
    │       ├── memory-hints.md         # 记忆提示
    │       ├── password-groups.md      # 密码组与输出适配
    │       ├── detached-password.md    # 游离密码
    │       ├── storage-data.md         # 存储数据与保存
    │       ├── import-export-migration.md  # 克隆、导入与迁移
    │       ├── security-and-privacy.md # 安全与隐私
    │       ├── faq.md                  # 常见问题
    │       └── glossary.md             # 术语表
    │
    └── styles/
        ├── site.css           # 落地页设计系统（~820 行，CSS 自定义属性 + 组件样式）
        └── starlight.css      # Starlight 主题覆盖（~240 行，色板与排版变量覆盖）
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（监听所有网络接口）
npm run dev

# 类型检查
npm run check
```

开发服务器默认会在 `http://localhost:4321` 启动。

## 构建与部署

```bash
# 生产构建
npm run build

# 预览构建产物
npm run preview
```

构建产物输出到 `dist/` 目录，结构如下：

```text
dist/
├── index.html                # 落地页
├── 404.html                  # 自定义 404 页面
├── docs/                     # 文档页面（每页一个目录）
│   ├── index.html
│   └── user/
│       ├── overview/index.html
│       ├── quick-start/index.html
│       └── ...
├── _astro/                   # 打包资源（CSS、JS）
└── pagefind/                 # Pagefind 搜索索引
```

产物可直接部署到任意静态托管服务。

## 设计系统

站点使用一套 **暖大地色系（warm earth tones）** 设计系统，灵感来自 Anthropic 的视觉风格。

### 色彩

| 角色 | 色值 | 用途 |
|------|------|------|
| Primary | `hsl(15, 65%, 52%)` | 主交互色（terracotta orange），按钮、链接、强调元素 |
| Primary Strong | `hsl(15, 70%, 42%)` | 交互态加深（hover/active） |
| Background (light) | `hsl(38, 28%, 91%)` | 浅色模式页面背景（warm cream） |
| Background (dark) | `hsl(40, 15%, 12%)` | 深色模式页面背景（dark olive） |
| Card (light) | `hsl(35, 22%, 85%)` | 浅色模式卡片背景 |
| Text (light) | `hsl(30, 15%, 15%)` | 浅色模式正文（dark brown） |
| Text (dark) | `hsl(35, 20%, 88%)` | 深色模式正文（light cream） |

### 深浅主题

- 通过 `<html>` 元素上的 `data-theme` 属性切换（值为 `light` 或 `dark`）。
- 用户选择持久化到 `localStorage`，key 为 `sc-theme`。
- 无用户偏好时跟随系统 `prefers-color-scheme`。
- 落地页和文档页共享同一套色板变量——落地页用 `site.css` 的原生 CSS 自定义属性，文档页通过 Starlight 的 `--sl-color-*` 变量映射。

### 排版

- 正文：`Inter` → `SF Pro Display` → 系统无衬线 → `PingFang SC` → `Microsoft YaHei`
- 代码：`Fira Code` → `JetBrains Mono` → `SF Mono` → 系统等宽
- 标题字重：600–800，正文：300–400
- 落地页使用 `.display-xl` / `.display-lg` / `.display-md` / `.display-sm` 响应式字号阶梯

### 落地页组件

| 组件 | 说明 |
|------|------|
| Navbar | 固定顶部，滚动后触发 glassmorphism 效果（`.scrolled`） |
| Hero | 全宽 hero 区域 + macOS 风格产品预览面板 |
| Feature Cards | 三列特性卡片，渐变背景 + glow blob 装饰 |
| Callout | 行动号召横幅 |
| CTA Section | 渐变背景 + 浮动 orb 动画 |
| Footer | 简洁页脚 |
| Scroll Reveal | 基于 IntersectionObserver 的滚动渐入动画 |

## 内容管理

### 文档页面

所有用户文档位于 `src/content/docs/docs/`，使用标准 Markdown 编写，每篇文件需要 Starlight frontmatter：

```yaml
---
title: 页面标题
description: 页面描述（用于 SEO 和列表展示）
---
```

支持 Starlight 内置的 admonition 指令：`:::note`、`:::tip`、`:::info`、`:::warning`、`:::caution`、`:::danger`、`:::important`。

### 添加新文档页

1. 在 `src/content/docs/docs/` 下创建新的 `.md` 文件。
2. 在 `astro.config.mjs` 的 `sidebar` 数组中添加对应的导航条目。
3. 如有需要，在相关页面添加交叉引用链接。

### 更新侧边栏

侧边栏结构在 `astro.config.mjs` 中定义，分为 4 个分组：

1. **开始使用** — 产品总览、快速开始、核心概念
2. **日常使用** — 工作方式、密码条目、记忆提示、密码组、游离密码
3. **数据与安全** — 存储数据与保存、克隆导入与迁移、安全与隐私
4. **参考** — 常见问题、术语表

每个条目使用 `slug` 指定目标路径（相对于 `src/content/docs/`）。

## 维护原则

- 产品应用部署在 `https://cues.whynotsnow.com/`，文档站点保留 `/` 和 `/docs/`。
- 站点文案面向最终用户，不承载开发者架构细节；开发者维护说明放在本文件的 `agents.md` 以及主仓库的 `README` / `AGENTS.md`。
- 内容中提到的存储字段名（如 `storageData`、`current.json`）、类型名、代码标识和规格关键字保持英文原样。
- Snow Cues 文档不使用「绝对安全」「不可破解」「零风险」等过度承诺。安全描述使用确定性语言：明确什么被保存、什么不被保存。
- 修改设计系统变量（`site.css` 和 `starlight.css`）时，确保落地页和文档页的视觉一致性。
