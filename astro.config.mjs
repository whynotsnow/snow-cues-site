import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Snow Cues',
      description: '本地优先的密码派生与加密存储系统用户文档',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '开始使用',
          items: [
            { label: '文档首页', slug: 'docs' },
            { label: '快速开始', slug: 'docs/user/quick-start' },
            { label: '核心概念', slug: 'docs/user/core-concepts' },
          ],
        },
        {
          label: '日常使用',
          items: [
            { label: '空间工作台', slug: 'docs/user/space-workbench' },
            { label: '密码条目', slug: 'docs/user/password-entries' },
            { label: '安全边界', slug: 'docs/user/security-boundaries' },
            { label: '常见问题', slug: 'docs/user/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
