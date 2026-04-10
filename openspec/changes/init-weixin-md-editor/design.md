## Context

这是一个全新项目，目标是构建一个本地运行的微信公众号 Markdown 编辑器。用户在左侧面板输入 Markdown，右侧实时预览微信兼容的渲染结果，点击复制后可直接粘贴到微信公众号编辑器并保留样式。

核心约束：微信公众号编辑器会过滤 `<style>` 标签、`position` 属性、`id` 属性等，所有 CSS 必须以 inline style 形式存在于 HTML 元素上。

## Goals / Non-Goals

**Goals:**
- 提供流畅的 Markdown 编辑和实时预览体验
- 渲染输出的 HTML 100% 兼容微信公众号编辑器（全内联样式）
- 一键复制富文本到剪贴板，粘贴后样式不丢失
- 代码块语法高亮，token 级别内联着色
- 内置至少一套默认主题

**Non-Goals:**
- 不实现图床上传功能（MVP 阶段）
- 不实现多主题切换（后续迭代）
- 不实现文章本地存储/历史管理
- 不实现微信公众号 API 直接发布

## Decisions

### 1. Markdown 解析库：选择 marked

**选择**: marked
**备选**: markdown-it, remark

**理由**: marked 轻量、速度快、自定义 renderer 简单。我们需要深度定制每个 HTML 元素的输出（注入 inline style），marked 的 custom renderer API 最直接。markdown-it 插件生态更丰富但对本项目过重；remark 基于 AST 变换，学习曲线高。

### 2. 代码高亮：选择 highlight.js

**选择**: highlight.js
**备选**: Prism.js, Shiki

**理由**: highlight.js 支持自动语言检测，API 简单，可以直接获取 token 化的 HTML 输出。Prism.js 需要预加载语言包；Shiki 基于 TextMate 语法更准确但体积大且需要 WASM。对于微信公众号场景，highlight.js 的输出质量足够。

### 3. CSS 内联策略：渲染时注入

**选择**: 在 marked renderer 中直接生成带 inline style 的 HTML
**备选**: 先生成标准 HTML 再用 juice/css-inline 后处理

**理由**: 直接在 renderer 中注入避免了额外的 DOM 解析和 CSS 内联转换开销。主题定义为 TypeScript 对象，每个元素类型映射到一组 CSS 属性。渲染时直接将对象序列化为 `style="..."` 字符串。这比后处理方案性能更好，代码也更简单。

### 4. 编辑器组件：使用 textarea

**选择**: 原生 `<textarea>` 
**备选**: CodeMirror, Monaco Editor

**理由**: MVP 阶段只需要文本输入功能，不需要语法高亮编辑。`<textarea>` 零依赖、加载快。后续如需编辑器增强可替换为 CodeMirror。

### 5. 项目布局：左右分栏

**选择**: 左侧编辑区 + 右侧预览区，固定布局
**理由**: 这是 Markdown 编辑器的经典交互模式，用户零学习成本。使用 TailwindCSS flexbox 实现。

## Risks / Trade-offs

- **[微信编辑器兼容性变化]** → 微信可能随时调整过滤规则。缓解：输出 HTML 尽量保守，只使用已验证支持的标签和属性，保持主题样式可配置。
- **[Clipboard API 浏览器兼容性]** → Firefox 对 ClipboardItem 支持有限。缓解：提供 `document.execCommand('copy')` 降级方案。
- **[代码高亮内联样式体积]** → 长代码块每个 token 都带 inline style，HTML 体积膨胀。缓解：微信文章通常代码量不大，可接受。
- **[textarea 编辑体验有限]** → 无语法高亮、无自动补全。缓解：MVP 定位，后续可升级。
