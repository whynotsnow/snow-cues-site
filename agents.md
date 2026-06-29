# Snow Cues Docs Site — AI 编码助手指南

本文档面向在 snow-cues-site 仓库中工作的 AI 编码助手（如 ZCode、Copilot、Cursor 等），提供项目结构、约定和常见任务的操作说明。

## 项目身份

- **仓库名称**: `snow-cues-site`
- **项目类型**: Astro v6 静态文档站点
- **产品**: Snow Cues — 纯浏览器运行、本地优先的密码派生与加密存储系统
- **站点构成**: 1 个手写落地页（`/`）+ 14 个 Starlight 文档页（`/docs/`）
- **语言**: 简体中文（zh-CN），仅此一种 locale
- **部署关系**: 本仓库是独立 Astro 项目，不包含产品应用代码。产品应用部署在 `https://cues.whynotsnow.com/`

## 技术架构

```
astro.config.mjs  ← 定义 Starlight 集成、侧边栏、locale
       │
       ├── src/pages/index.astro        ← 落地页（手写 Astro 组件）
       │       └── 导入 src/styles/site.css（自定义设计系统）
       │
       └── Starlight 集成
               │
               ├── 布局: Starlight 内置（侧边栏、搜索、目录）
               ├── 样式: src/styles/starlight.css（覆盖 Starlight CSS 变量）
               └── 内容: src/content/docs/docs/**/*.md
```

- **无前端框架**：没有 React、Vue、Svelte 等。所有 UI 用 Astro 组件 + 内联 JS + 手写 CSS 实现。
- **无 API / 无后端**：不执行任何 `fetch()` 调用，没有 API 路由，没有环境变量。
- **纯静态构建**：所有内容在构建时编译为静态 HTML + CSS + JS。
- **搜索**：Pagefind 在构建时索引 Markdown 内容，生成静态搜索资源。
- **TypeScript 使用范围**：`tsconfig.json` 仅用于 `astro.config.mjs` 和 `content.config.ts` 的类型校验，Markdown 文件无类型约束。

## 目录约定

```
src/
├── content.config.ts          # 内容集合定义（不要修改，除非 Starlight 升级要求）
│
├── pages/
│   └── index.astro            # 唯一的手写页面。若需新增独立页面，在此目录添加 .astro 文件
│
├── content/docs/docs/         # 所有用户文档
│   ├── index.md               # 文档首页（/docs/）
│   └── user/                  # 用户文档子目录（对应 /docs/user/ 路由）
│       ├── overview.md
│       ├── quick-start.md
│       ├── core-concepts.md
│       ├── how-it-works.md
│       ├── password-entries.md
│       ├── memory-hints.md
│       ├── password-groups.md
│       ├── detached-password.md
│       ├── storage-data.md
│       ├── import-export-migration.md
│       ├── security-and-privacy.md
│       ├── faq.md
│       └── glossary.md
│
└── styles/
    ├── site.css               # 落地页设计系统（CSS 自定义属性 + 组件样式）
    └── starlight.css          # Starlight 主题覆盖（映射 --sl-color-* 变量）
```

### 目录规则

- **不要创建** `src/components/`、`src/layouts/`、`src/lib/` 等目录，除非有明确需要并且先更新本文件。
- **不要创建** `public/` 目录——Starlight 内部处理 favicon 等资源。
- Markdown 中的图片/截图使用 Starlight 的内容资源方式（放在内容目录旁的 `assets/` 中）。

## 配置关键点

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Snow Cues',
      description: '本地优先的密码派生与加密存储系统用户文档',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [ /* 4 个分组，见侧边栏管理章节 */ ],
    }),
  ],
});
```

- `customCss` 仅引入 `starlight.css`。`site.css` 由 `index.astro` 自行导入，不要加到 `customCss` 中。
- `locales.root` 是唯一 locale，不要添加其他语言。
- 修改 sidebar 后需要重启开发服务器才能看到变化。

### `src/content.config.ts`

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
```

此文件的作用是让 Astro 将 `src/content/docs/` 识别为 Starlight 文档集合。通常不需要修改。

### `tsconfig.json`

继承 `astro/tsconfigs/strict`。排除 `dist/`。

## 内容编写规范

### Markdown 文件格式

每篇文档文件需包含 Starlight frontmatter：

```yaml
---
title: 页面标题
description: 页面描述（用于 SEO、社交分享和列表展示）
---
```

正文使用标准 Markdown。支持 Starlight 的 admonition 指令：

| 指令 | 用途 |
|------|------|
| `:::note` | 补充说明 |
| `:::tip` | 提示/技巧 |
| `:::info` | 一般信息 |
| `:::warning` | 警告 |
| `:::caution` | 注意事项 |
| `:::danger` | 危险/风险提示 |
| `:::important` | 重要提示（自定义样式） |

### 文案规范

1. **语言**：全部使用简体中文，包括 frontmatter 中的 `title` 和 `description`。
2. **术语呈现**：
   - 代码标识、类型名、存储字段名保持英文并用反引号包裹。例如：`` `storageData` ``、`` `current.json` ``、`` `ruleId` ``。
   - 规格关键字保持英文。例如：`HMAC-SHA256`、`PBKDF2`、`non-extractable`、`WebCrypto`。
   - 路径、文件名和外部链接用反引号：`` `https://cues.whynotsnow.com/` ``、`` `src/content/docs/` ``。
3. **语气**：面向最终用户，直接、有边界感。不使用「绝对安全」「不可破解」「零风险」等过度承诺。明确说明「什么会被保存、什么不会被保存」。
4. **结构**：优先使用小标题分层，便于扫描。每个主要功能段落以一句话总结开头。
5. **交叉引用**：使用相对链接格式 `/docs/user/目标页面-slug/`。

### 新增文档页的步骤

1. 在 `src/content/docs/docs/` 对应子目录下创建 `.md` 文件。
2. 写入符合规范的 frontmatter 和正文。
3. 在 `astro.config.mjs` 的 `sidebar` 中找到对应分组，添加 `{ label: '页面标题', slug: 'docs/user/文件名' }`。
4. 在相关页面（如 `index.md`）添加交叉引用链接。
5. 运行 `npm run dev` 验证页面渲染和导航是否正确。

### 修改现有文档

- 直接编辑 `.md` 文件，保存后开发服务器会自动热更新。
- 如果修改了 frontmatter 中的 `title`，同步更新 `astro.config.mjs` 中的 `label`（如不匹配会导致侧边栏高亮异常）。
- 如果修改了文件名，需要同步更新：
  - `astro.config.mjs` 中的 `slug`
  - 所有指向该页面的交叉引用链接

## 侧边栏管理

侧边栏配置在 `astro.config.mjs` 的 `sidebar` 数组中，当前结构：

```js
sidebar: [
  {
    label: '开始使用',
    items: [
      { label: '文档首页', slug: 'docs' },
      { label: '产品总览', slug: 'docs/user/overview' },
      { label: '快速开始', slug: 'docs/user/quick-start' },
      { label: '核心概念', slug: 'docs/user/core-concepts' },
    ],
  },
  {
    label: '日常使用',
    items: [
      { label: '工作方式', slug: 'docs/user/how-it-works' },
      { label: '密码条目', slug: 'docs/user/password-entries' },
      { label: '记忆提示', slug: 'docs/user/memory-hints' },
      { label: '密码组与输出适配', slug: 'docs/user/password-groups' },
      { label: '游离密码', slug: 'docs/user/detached-password' },
    ],
  },
  {
    label: '数据与安全',
    items: [
      { label: '存储数据与保存', slug: 'docs/user/storage-data' },
      { label: '克隆、导入与迁移', slug: 'docs/user/import-export-migration' },
      { label: '安全与隐私', slug: 'docs/user/security-and-privacy' },
    ],
  },
  {
    label: '参考',
    items: [
      { label: '常见问题', slug: 'docs/user/faq' },
      { label: '术语表', slug: 'docs/user/glossary' },
    ],
  },
],
```

- `slug` 相对于 `src/content/docs/`，不需要文件扩展名。例如 `docs/user/faq` 对应文件 `src/content/docs/docs/user/faq.md`。
- 侧边栏分组（group）可通过 Starlight 的 `collapsed` 属性折叠（如 `{ label: '…', collapsed: true, items: […] }`）。
- 修改 sidebar 后需手动刷新或重启开发服务器。

## 设计系统与样式

### 架构

```
site.css           ← 落地页专用（index.astro 中 import）
  ├── :root        ← CSS 自定义属性（浅色模式色板、字体、圆角、阴影、缓动）
  ├── :root[data-theme='dark']  ← 深色模式覆盖
  ├── @layer base  ← 全局 reset 和排版基准
  └── 组件样式     ← .site-nav、.hero-section、.feature-card、.cta-section 等

starlight.css      ← 文档页专用（astro.config.mjs 的 customCss）
  ├── :root[data-theme='light']  ← 重映射 --sl-color-* 变量到暖大地色
  ├── :root / :root[data-theme='dark']  ← 深色模式 --sl-color-* 重映射
  ├── 全局排版覆盖  ← --sl-font, --sl-font-mono, --sl-text-h1-h4
  └── 组件覆盖     ← 导航栏、侧边栏、代码块、引用块、表格等 Starlight 组件
```

### 设计 tokens（两种 CSS 文件共享的色值语义）

| Token | 色值 | 角色 |
|-------|------|------|
| `--primary` / `--sl-color-accent` | `hsl(15, 65%, 52%)` | 主交互色（terracotta orange） |
| `--primary-strong` / `--sl-color-accent-high` | `hsl(15, 70%, 42%)` | hover/active 加深 |
| `--bg` / `--sl-color-black` (light) | `hsl(38, 28%, 91%)` | 浅色页面背景（warm cream） |
| `--bg` (dark) | `hsl(40, 15%, 12%)` | 深色页面背景（dark olive） |
| `--font-sans` / `--sl-font` | Inter 降级到系统无衬线 + 中文字体 | 正文字体栈 |
| `--font-mono` / `--sl-font-mono` | Fira Code 降级到系统等宽 | 代码字体栈 |

### 样式修改注意事项

- **修改色板**：两个 CSS 文件需要同步更新。`site.css` 用原生自定义属性，`starlight.css` 用 `--sl-color-*` 变量映射相同的色值。
- **修改排版**：`site.css` 中是落地页排版阶梯（`.display-xl` 等），`starlight.css` 中是 `--sl-text-h1` 等变量，两者独立。
- **主题切换**：落地页通过内联 JS 切换 `<html data-theme="light|dark">`，Starlight 有自己的主题切换机制。确保两边的 `data-theme` 选择器一致。
- **不要引入** Tailwind CSS 或其他 CSS 框架。
- **新增组件样式**优先使用 `site.css` 中已定义的 CSS 自定义属性，遵循现有的命名约定。

## 落地页 (`index.astro`)

### 结构

落地页是一个完整的 Astro 页面，包含：

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <!-- Google Fonts 预连接 -->
    <!-- meta 标签 -->
    <!-- title 标签 -->
  </head>
  <body>
    <main>
      <header>  <!-- 固定导航栏，含品牌标志、链接和主题切换按钮 --> </header>
      <section> <!-- Hero 区域，含标语、描述、CTA 按钮和产品预览面板 --> </section>
      <section> <!-- Features 三列特性卡片 --> </section>
      <section> <!-- Callout 横幅 --> </section>
      <section> <!-- CTA 区域（渐变背景 + 浮动 orb） --> </section>
      <footer> <!-- 页脚 --> </footer>
    </main>
    <script> <!-- 内联 JS：导航栏滚动效果、主题切换、滚动渐入动画 --> </script>
  </body>
</html>
```

### 数据驱动区域

- `highlights` 数组：特性卡片的数据（icon、title、text），通过 `array.map()` 渲染。
- `flows` 数组：工作流步骤列表，通过 `array.map()` 渲染。

### 内联脚本

- **导航栏滚动效果**：`scroll` 事件监听，`scrollY > 20` 时给 `#site-nav` 添加 `.scrolled` 类。
- **主题切换**：读取/写入 `localStorage`（key: `sc-theme`），切换 `<html>` 的 `data-theme` 属性，更新图标显示。
- **滚动渐入动画**：`IntersectionObserver` 监听 `.reveal` 元素，进入视口时添加 `.in-view` 类。

### 修改注意事项

- 导航栏链接：修改时确保 `/docs/` 和 `/docs/user/security-and-privacy/` 路径与文档页 slug 一致。`https://cues.whynotsnow.com/` 指向外部应用。
- CTA 按钮链接同理。
- 修改 `flows` 数组时同步检查产品预览面板的步骤序号。

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器（监听所有网络接口）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# TypeScript 类型检查
npm run check
```

所有命令均禁用了 Astro 遥测（`ASTRO_TELEMETRY_DISABLED=1`）。

### 构建产物

执行 `npm run build` 后，产物输出到 `dist/`：

```
dist/
├── index.html           # 落地页
├── 404.html             # 自定义 404
├── docs/                # 文档页（每页一个目录，index.html）
│   ├── index.html
│   └── user/
│       ├── overview/index.html
│       ├── quick-start/index.html
│       └── ...
├── _astro/              # 构建资源（CSS、JS chunk）
└── pagefind/            # Pagefind 搜索索引
```

`dist/` 目录在 `.gitignore` 中，不要提交到仓库。

## 禁止事项（Don'ts）

1. **不要引入前端框架**：不要添加 React、Vue、Svelte 等依赖。
2. **不要引入 CSS 框架**：不要添加 Tailwind CSS、Bootstrap 等。
3. **不要添加新 locale**：站点仅支持 zh-CN。
4. **不要添加 API 路由**：不要创建 `src/pages/api/`，不要使用 Astro 的服务端渲染模式（SSR）。
5. **不要创建 `src/components/`**：如确有复用需要，先提出方案讨论。
6. **不要修改 `content.config.ts`**：除非 Starlight 升级后有 API 变更要求。
7. **不要在文档中使用过度安全承诺**：避免「绝对安全」「不可破解」「零风险」等措辞。
8. **不要将 `site.css` 添加到 `customCss`**：它只由 `index.astro` 导入。
9. **不要修改 `tsconfig.json` 的 strict 模式**。
10. **不要提交 `dist/`、`.astro/`、`node_modules/`**：这些已在 `.gitignore` 中。

## 常见任务速查

### 添加新的文档页

1. 创建 `src/content/docs/docs/user/新文件名.md`
2. 写入 frontmatter + 正文
3. 在 `astro.config.mjs` 的合适 sidebar 分组中添加条目
4. 在相关页面添加交叉引用链接

### 修改侧边栏

编辑 `astro.config.mjs` → `sidebar` 数组。`slug` 对应不带扩展名的文件路径（相对于 `src/content/docs/`）。

### 调整设计系统色板

1. 编辑 `src/styles/site.css` 中的 `:root` 和 `:root[data-theme='dark']` CSS 自定义属性。
2. 编辑 `src/styles/starlight.css` 中的对应 `--sl-color-*` 变量，确保色值一致。

### 更新依赖

```bash
npm update        # 语义化版本范围内的更新
npm outdated      # 查看可用的更新
```

Astro 和 Starlight 大版本升级前检查其 CHANGELOG 中的 breaking changes。
