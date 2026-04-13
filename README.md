# 微信公众号 Markdown 编辑器

<a href="https://larntin.github.io/weixin-md/" target="_blank">在线使用</a>

一个本地运行的 Markdown 编辑器，将 Markdown 渲染为微信公众号兼容的富文本，一键复制后可直接粘贴到微信公众号编辑器中并保留排版样式。

## 功能

- Markdown 实时编辑与预览（左右分栏）
- CodeMirror 6 编辑器，支持 Markdown 语法高亮
- 渲染输出全部使用内联样式，兼容微信公众号编辑器
- 代码块语法高亮（highlight.js，token 级别内联着色）
- 一键复制富文本到剪贴板（Clipboard API + fallback）
- 支持标题、段落、加粗、斜体、删除线、引用、列表、表格、链接、图片、分割线等常见 Markdown 语法

## 快速开始

```bash
npm install
npm run dev
```

打开浏览器访问 `http://localhost:5173`，在左侧输入 Markdown，右侧实时预览，点击「复制到公众号」按钮后粘贴到微信公众号后台编辑器即可。

## 技术栈

Vite + React + TypeScript + TailwindCSS + CodeMirror 6 + marked + highlight.js
