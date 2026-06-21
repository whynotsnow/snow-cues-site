# Snow Cues Docs Site

这是 Snow Cues 的用户侧文档介绍站，已经作为独立 Astro 项目维护。

## 技术栈

- Astro
- Starlight
- Markdown / MDX-ready content
- 静态构建，适合 GitHub Pages、Cloudflare Pages 或其他静态托管

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 当前目录约定

```text
astro.config.mjs
package.json
src/
  pages/
    index.astro
  content/
    docs/
      docs/
        index.md
        user/
          quick-start.md
          core-concepts.md
          space-workbench.md
          password-entries.md
          security-boundaries.md
          troubleshooting.md
  styles/
    site.css
    starlight.css
public/
  screenshots/
```

## 维护原则

- 产品应用建议部署到 `/app/`，文档介绍站保留 `/` 和 `/docs/`。
- 站点文案应面向用户，不承载开发者架构细节；开发者维护说明继续放在主仓库 README / AGENTS.md。
