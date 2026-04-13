# 设计：多主题配色 + 外链引用 + 图表公式支持

## 架构概览

```
用户输入 Markdown
    │
    ▼
marked 解析（自定义 Renderer + Extensions）
    │
    ├─ 普通元素 → 内联样式 HTML（主题 + 配色驱动）
    ├─ 外链 → 收集到引用列表，正文显示上标编号
    ├─ 脚注 → 收集到脚注列表，正文显示上标编号
    ├─ ```mermaid → 占位标记（预览区由 mermaid.js 渲染）
    ├─ $...$ / $$...$$ → KaTeX 渲染为 HTML
    └─ {汉字}(pinyin) → <ruby> 标签
    │
    ▼
预览区渲染
    │
    ├─ Mermaid 占位 → mermaid.js 渲染 SVG + "下载 PNG" 按钮
    ├─ KaTeX 块级 → 渲染 + "下载 PNG" 按钮
    └─ 其他 → 直接展示内联样式 HTML
    │
    ▼
复制到公众号
    │
    ├─ Mermaid 位置 → 替换为 【请插入图片：Mermaid 图表】
    ├─ KaTeX 块级 → 替换为 【请插入图片：数学公式】
    ├─ KaTeX 行内 → 尝试保留 HTML，不支持时 fallback 纯文本
    └─ 其他 → 正常复制
```

## 1. 多主题 + 配色系统

### 主题定义

保留现有 `ThemeStyles` 类型结构不变。新增 4 套主题，每套主题是一个完整的 `ThemeStyles` 对象：

| 主题 ID | 名称 | 风格特征 |
|---|---|---|
| `default` | 经典 | 当前样式，居中标题 + 底部边框，H2 带彩色背景 |
| `grace` | 优雅 | 文字阴影，圆角卡片式引用块，精致的 blockquote |
| `simple` | 极简 | 不对称圆角，大量留白，细线分割 |
| `modern` | 现代 | 大圆角（16px+），药丸形标题背景，宽松行高（2.0） |

### 配色定义

配色独立于主题。每种配色是一个 `ColorPalette` 对象：

```typescript
type ColorPalette = {
    primary: string;      // 主色（H2 背景、强调色）
    primaryLight: string;  // 主色浅版（引用边框、表头背景）
    link: string;         // 链接色
    codeInline: string;   // 行内代码文字色
};
```

13 种预设配色：蓝、深蓝、绿、墨绿、紫、靛、红、橙、棕、青、粉、灰、黑。

### 主题 + 配色组合机制

`theme.ts` 导出一个工厂函数：

```typescript
function buildTheme(themeId: string, paletteId: string): ThemeStyles
```

先加载主题的基础样式对象，再用配色覆盖其中的颜色相关属性（H2 background、blockquote borderLeft、a color、codeInline color 等）。

### 文件改动

- `src/lib/theme.ts`：重构为多主题 + 配色系统，导出 `buildTheme()`、`themeList`、`paletteList`
- `src/lib/renderer.ts`：`createRenderer()` 接收 `ThemeStyles` 参数不变，无需改动
- `src/lib/markdown.ts`：`renderMarkdown()` 接收 themeId + paletteId 参数

## 2. 外链转底部引用

### 渲染机制

在 `renderer.ts` 的 `link` 方法中：

1. 判断是否为外链（非 `mp.weixin.qq.com` 域名，且非锚点 `#`）
2. 外链：收集到模块级数组 `footnoteLinks[]`，正文输出 `<span>文字<sup style="...">[N]</sup></span>`
3. 微信内链：保留原始 `<a>` 标签
4. 渲染完成后，调用 `getFootnoteLinksHtml()` 在 HTML 末尾追加引用列表区块

### 引用区块样式

```html
<section style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
  <p style="font-size: 13px; color: #999; margin-bottom: 8px;">参考链接</p>
  <p style="font-size: 12px; color: #999; word-break: break-all;">[1] https://...</p>
  <p style="font-size: 12px; color: #999; word-break: break-all;">[2] https://...</p>
</section>
```

### 开关控制

工具条上提供 checkbox `外链转引用`，默认开启。关闭时恢复原始 `<a>` 行为。

## 3. Mermaid 图表

### 依赖

新增 `mermaid`（npm 包）。

### 渲染流程

1. marked 的 `code` 方法检测 `lang === 'mermaid'`
2. 输出占位 `<div class="mermaid-placeholder" data-chart="...">` （data-chart 存原始 mermaid 代码，base64 编码）
3. 预览组件中用 `useEffect` 扫描 `.mermaid-placeholder` 元素，调用 `mermaid.render()` 渲染为 SVG
4. 渲染后在每个图表右上角叠加 `下载 PNG` 按钮

### 下载 PNG 实现

SVG → 创建 `<canvas>` → `drawImage()` → `canvas.toDataURL('image/png')` → 触发 `<a download>` 下载。

### 复制行为

复制到公众号时，扫描 HTML 中的 mermaid 占位区域，替换为：

```html
<p style="color: #999; background: #f5f5f5; padding: 12px; text-align: center; border-radius: 4px;">
  【请插入图片：Mermaid 图表】
</p>
```

## 4. KaTeX 数学公式

### 依赖

新增 `katex`（npm 包）。

### 语法识别

通过 marked 的 extension API 注册自定义 tokenizer：

- 行内公式：`$...$`（不含空格开头/结尾）
- 块级公式：`$$...$$`（独占一行）

### 渲染

- 调用 `katex.renderToString(tex, { displayMode, throwOnError: false })`
- 输出 KaTeX 生成的 HTML（包含内联样式的 span 嵌套结构）
- 需要在页面中引入 `katex.min.css`（通过 `<link>` 或将关键 CSS 内联）

### 块级公式：下载 PNG

与 Mermaid 相同的 SVG → Canvas → PNG 流程。KaTeX 的 HTML 输出可以通过 `html2canvas` 或类似方案转为图片。

### 复制行为

- 行内公式：尝试直接保留 KaTeX HTML 输出。如果微信编辑器不支持部分 CSS，fallback 为纯 LaTeX 文本 `$formula$`
- 块级公式：替换为占位 `【请插入图片：数学公式】`

## 5. 脚注

### 语法

标准 markdown 脚注语法：

```markdown
这是正文[^1]。

[^1]: 这是脚注内容。
```

### 实现

通过 marked extension 注册：

1. tokenizer 识别 `[^N]` 引用和 `[^N]:` 定义
2. 正文中输出上标编号 `<sup>[N]</sup>`
3. 文章末尾（外链引用区块之前）输出脚注区块

### 脚注区块样式

```html
<section style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #eee;">
  <p style="font-size: 13px; color: #999; margin-bottom: 8px;">注释</p>
  <p style="font-size: 12px; color: #666;">[1] 脚注内容...</p>
</section>
```

### 底部区块顺序

脚注区块 → 外链引用区块（如果有）。

## 6. Ruby Text 注音

### 语法

```markdown
{汉字}(hànzì)
```

### 实现

通过 marked extension 的 inline tokenizer 识别 `{...}(...)` 模式，输出：

```html
<ruby style="ruby-position: over;">
  汉字<rp>(</rp><rt style="font-size: 12px; color: #999;">hànzì</rt><rp>)</rp>
</ruby>
```

微信编辑器支持 `<ruby>` 标签，无兼容性问题。

## 7. Titlebar 警告图标

### 触发条件

解析 markdown 后检测是否存在：
- Mermaid 代码块
- 块级数学公式 `$$...$$`

任一存在时显示警告。

### UI 表现

header 区域（标题右侧）显示一个橙色 `⚠` 图标，hover 时 tooltip：

> 文档包含图表或公式，复制后需手动下载图片并插入到公众号编辑器

没有这类内容时图标不渲染。

## 8. 工具条布局

### 位置

预览区上方，编辑器面板和预览面板之间的分隔线下方。

### 布局

```
[主题: ▼ 经典] [配色: ▼ 蓝色] [☑ 外链转引用]            [复制到公众号]
```

- 左侧：主题 select + 配色 select + 外链引用 checkbox
- 右侧：复制按钮（从 header 移过来）
- header 保留：标题 + 编辑器 dark/light 切换 + 警告图标

### 状态管理

App.tsx 新增 state：

```typescript
const [themeId, setThemeId] = useState('default');
const [paletteId, setPaletteId] = useState('blue');
const [linkToFootnote, setLinkToFootnote] = useState(true);
```

`renderedHtml` 的 `useMemo` 依赖项增加 `themeId`、`paletteId`、`linkToFootnote`。

## 新增依赖

| 包 | 用途 |
|---|---|
| `mermaid` | Mermaid 图表渲染 |
| `katex` | 数学公式渲染 |

不引入 `html2canvas`，块级公式的下载 PNG 使用与 Mermaid 相同的 DOM → Canvas 方案。

## 文件改动清单

| 文件 | 改动类型 | 说明 |
|---|---|---|
| `src/lib/theme.ts` | 重构 | 多主题 + 配色系统，导出 `buildTheme()`、列表常量 |
| `src/lib/renderer.ts` | 修改 | 外链收集 + 脚注收集 + mermaid/katex/ruby 占位处理 |
| `src/lib/markdown.ts` | 修改 | 注册 marked extensions（KaTeX、脚注、ruby），传入主题参数 |
| `src/lib/extensions.ts` | 新增 | marked extensions 定义（KaTeX tokenizer、脚注、ruby） |
| `src/lib/mermaid-render.ts` | 新增 | Mermaid SVG 渲染 + PNG 下载逻辑 |
| `src/lib/export-png.ts` | 新增 | 通用的 DOM/SVG → Canvas → PNG 下载工具 |
| `src/components/PreviewToolbar.tsx` | 新增 | 工具条组件（主题/配色/外链开关/复制按钮） |
| `src/components/MermaidBlock.tsx` | 新增 | Mermaid 图表预览 + 下载按钮组件 |
| `src/components/KatexBlock.tsx` | 新增 | 块级公式预览 + 下载按钮组件 |
| `src/App.tsx` | 修改 | 集成工具条、警告图标、新增 state |
| `src/lib/clipboard.ts` | 修改 | 复制前替换 mermaid/katex 占位为提示文字 |
| `package.json` | 修改 | 新增 mermaid、katex 依赖 |
