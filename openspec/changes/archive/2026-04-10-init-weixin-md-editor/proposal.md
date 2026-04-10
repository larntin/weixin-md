## Why

目前使用 Markdown 编写微信公众号文章时，没有一个轻量、本地可运行的工具能够将 Markdown 渲染为微信公众号兼容的富文本并一键复制粘贴。现有开源方案（doocs/md、mdnice 等）要么依赖在线服务，要么功能过于复杂。我们需要一个简洁的本地 Web 应用，用 Vite + React + TypeScript + TailwindCSS 构建，专注于 Markdown 到微信公众号富文本的转换和复制。

## What Changes

- 初始化 Vite + React + TypeScript + TailwindCSS 项目脚手架
- 实现 Markdown 编辑器面板（左侧输入，右侧实时预览）
- 实现 Markdown → 微信兼容 HTML 渲染引擎（全部 CSS 内联）
- 实现一键复制功能，通过 Clipboard API 将渲染后的 HTML 以 `text/html` 写入剪贴板
- 内置默认主题样式，确保粘贴到微信公众号编辑器后保留排版
- 支持代码块语法高亮（内联样式 token 级别着色）

## Capabilities

### New Capabilities
- `markdown-editor`: Markdown 文本编辑面板，支持实时输入和基础编辑体验
- `wechat-html-renderer`: Markdown 到微信兼容 HTML 的渲染引擎，包含 CSS 内联、主题样式映射、微信标签兼容处理
- `clipboard-copy`: 一键复制渲染后的富文本 HTML 到系统剪贴板，保留 text/html MIME 类型
- `code-highlight`: 代码块语法高亮，每个 token 内联样式着色，兼容微信编辑器

### Modified Capabilities
<!-- 新项目，无已有能力需要修改 -->

## Impact

- **新增依赖**: React, TypeScript, Vite, TailwindCSS, marked/markdown-it, highlight.js/prism.js
- **代码范围**: 全新项目，从零构建前端应用
- **部署**: 本地开发服务器运行，也可构建为静态 HTML 部署
- **兼容性**: 需要现代浏览器（Chrome 86+, Edge 86+, Safari 13.1+）支持 Clipboard API
