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
            { label: '产品总览', slug: 'docs/user/overview' },
            { label: '快速开始', slug: 'docs/user/quick-start' },
            { label: '使用路径', slug: 'docs/user/usage-paths' },
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
            { label: '多设备同步', slug: 'docs/user/multi-device-sync' },
          ],
        },
        {
          label: '数据与安全',
          items: [
            { label: '存储数据与保存', slug: 'docs/user/storage-data' },
            { label: '克隆、导入与迁移', slug: 'docs/user/import-export-migration' },
            { label: '安全与隐私', slug: 'docs/user/security-and-privacy' },
            { label: '运行方式与自部署', slug: 'docs/user/self-hosting' },
            { label: '安全性与便利性的取舍', slug: 'docs/user/security-convenience-tradeoffs' },
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
    }),
  ],
});
