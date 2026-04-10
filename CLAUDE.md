# weixin-md - 微信公众号 Markdown 编辑器

## 项目目标

构建一个本地可运行的 Markdown 编辑器 Web 应用，用户可以贴入 Markdown 格式文本，编辑器将其渲染为微信公众号兼容的富文本，复制后直接粘贴到微信公众号编辑器中，**保留原有排版样式**。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: TailwindCSS（用于编辑器 UI），内联 CSS（用于输出内容）
- **编辑器**: CodeMirror 6（Markdown 语法高亮 + One Dark 主题）
- **Markdown 解析**: marked（自定义 Renderer 注入内联样式）
- **代码高亮**: highlight.js（token 级别内联样式，One Dark 配色）

## 核心架构

```
用户输入 Markdown → 解析为 AST → 渲染为 HTML（内联样式） → 预览 → 复制到剪贴板 → 粘贴到微信编辑器
```

---

## 微信公众号编辑器技术限制（关键约束）

### 支持的 HTML 标签
- 文本: `<p>`, `<h1>`-`<h6>`, `<strong>`/`<b>`, `<em>`/`<i>`, `<u>`, `<br>`, `<span>`
- 列表: `<ul>`, `<ol>`, `<li>`
- 表格: `<table>`, `<tr>`, `<td>`, `<th>`
- 媒体: `<img>`, `<a>`（外链会触发安全提醒）
- 布局: `<section>`, `<div>`
- 代码: `<code>`, `<pre>`

### 支持的 CSS 属性（必须全部内联）
- 字体: `font-size`, `color`, `font-weight`, `font-style`, `font-family`
- 间距: `margin`, `padding`, `line-height`, `letter-spacing`
- 对齐: `text-align`, `vertical-align`, `display`
- 视觉: `border-radius`, `box-shadow`, `background-color`, `background`
- 边框: `border`, `border-left`, `border-bottom` 等
- 其他: `text-decoration`, `opacity`, `white-space`, `word-break`, `overflow-wrap`

### 被过滤/禁止的功能
- `<script>`, `<iframe>`, `<form>`, `<input>` 全部禁止
- `<style>` 标签会被移除 —— **所有 CSS 必须写为 inline style**
- `position: absolute/fixed/relative` 被删除
- 所有 `id` 属性被移除
- `@media`, `@keyframes` 无法使用
- `transform`, `transform-origin` 兼容性差（iOS 上无效）
- `%` 作为高度/位移单位不起作用
- `float` 会导致元素脱离文档流，慎用
- 伪类（`:hover` 等）、CSS 选择器均不可用
- class 属性会被保留但无对应样式规则（因 `<style>` 被删）

### 图片限制
- 微信自动应用 `max-width: 100%`
- SVG 内嵌图像须使用素材库链接，外链/Base64 无法显示
- 建议图片上传至微信素材库或可靠图床

### 已知坑点
- `<ul>` 和 `<ol>` 的默认样式会被微信编辑器重置，需要手动内联 `list-style` 相关样式
- 代码块需要用 `<pre>` + `<code>` 并对每行/每个 token 内联样式
- 链接 `<a>` 外链会触发微信安全提醒弹窗

---

## 复制到剪贴板的技术方案

### 核心实现：Clipboard API

使用 `navigator.clipboard.write()` 将渲染后的 HTML 以 `text/html` MIME 类型写入剪贴板：

```typescript
async function copyToClipboard(html: string) {
  const blob = new Blob([html], { type: 'text/html' });
  const item = new ClipboardItem({ 'text/html': blob });
  await navigator.clipboard.write([item]);
}
```

### 为什么必须用 text/html

微信公众号编辑器通过 `contenteditable` 实现，粘贴时读取剪贴板中的 `text/html` 格式数据。如果只复制纯文本，所有样式都会丢失。

### 浏览器兼容性
- Chrome 86+, Edge 86+, Safari 13.1+ 支持 `ClipboardItem`
- Firefox 87+ 需要在 `about:config` 中启用 `dom.events.asyncClipboard.clipboardItem`

---

## CSS 内联方案

由于微信编辑器会过滤 `<style>` 标签，所有样式必须内联到每个 HTML 元素的 `style` 属性中。

### 实现策略

1. **Markdown → HTML**: 使用 marked 自定义 Renderer 解析为 HTML
2. **主题样式映射**: 为每种 HTML 元素（h1, h2, p, code, blockquote 等）定义对应的 inline style 对象
3. **渲染时注入**: 在渲染每个元素时，将对应的 style 对象转为 inline style 字符串写入元素
4. **不使用 CSS class**: 最终输出的 HTML 不依赖任何 class 或外部样式

### 示例主题样式结构

```typescript
const theme = {
  h1: { fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '16px', borderBottom: '2px solid #333', paddingBottom: '8px' },
  h2: { fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '12px' },
  p: { fontSize: '16px', lineHeight: '1.75', color: '#333', marginBottom: '16px' },
  blockquote: { borderLeft: '4px solid #ddd', paddingLeft: '16px', color: '#666', margin: '16px 0' },
  code: { backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px', fontSize: '14px', fontFamily: 'Menlo, Monaco, monospace' },
  pre: { backgroundColor: '#282c34', padding: '16px', borderRadius: '8px', overflowX: 'auto' },
  // ...
};
```

---

## 参考开源项目

- [doocs/md](https://github.com/doocs/md) - Vue 3 + Vite 实现，功能最全面，支持多主题、多图床、AI 助手
- [lyricat/wechat-format](https://github.com/lyricat/wechat-format) - 已停止维护，解决了 ul/ol 样式重置问题
- [jaywcjlove/wxmp](https://github.com/jaywcjlove/wxmp) - 微信公众号 Markdown 编辑器
- [mdnice](https://editor.mdnice.com/) - 商业化产品，海量主题
- [md2wechat](https://www.md2wechat.cn) - 多主题一键排版

---

## 开发注意事项

- 编辑器 UI 使用 TailwindCSS，但**输出的微信兼容 HTML 不能使用 TailwindCSS class**，必须全部内联
- 优先使用 `px` 单位，避免 `%`、`em`、`rem`（微信兼容性差）
- 代码高亮的每个 token 都需要内联 `color`、`font-weight` 等样式
- 测试时需要实际在微信公众号后台编辑器中粘贴验证
- 考虑提供"复制成功"的用户反馈提示
