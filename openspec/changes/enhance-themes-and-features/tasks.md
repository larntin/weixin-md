# 任务清单

## T1: 多主题 + 配色系统 | 复杂度：中

- [x] 重构 `src/lib/theme.ts`：定义 `ColorPalette` 类型和 13 种预设配色
- [x] 新增 3 套主题（grace / simple / modern），每套完整的 `ThemeStyles` 对象
- [x] 实现 `buildTheme(themeId, paletteId)` 工厂函数，将配色覆盖到主题颜色属性
- [x] 导出 `themeList` 和 `paletteList` 常量供 UI 使用
- [x] 修改 `src/lib/markdown.ts`：`renderMarkdown()` 接收 themeId + paletteId 参数

## T2: 预览区工具条 | 复杂度：低

- [x] 新增 `src/components/PreviewToolbar.tsx`：主题 select + 配色 select + 外链引用 checkbox + 复制按钮
- [x] 修改 `src/App.tsx`：新增 themeId / paletteId / linkToFootnote state，集成工具条
- [x] 将复制按钮从 header 移到工具条右侧
- [x] `renderedHtml` 的 useMemo 依赖项加入新 state

## T3: 外链转底部引用 | 复杂度：中

- [x] 修改 `src/lib/renderer.ts`：link 方法判断外链，收集到 footnoteLinks 数组，正文输出上标编号
- [x] 实现 `getFootnoteLinksHtml()` 生成底部引用区块 HTML（内联样式）
- [x] `renderMarkdown()` 接收 linkToFootnote 参数控制开关
- [x] 微信内链（mp.weixin.qq.com）和锚点链接不转换

## T4: marked extensions — KaTeX / 脚注 / Ruby | 复杂度：中

- [x] 安装 katex 依赖
- [x] 新增 `src/lib/extensions.ts`：定义 KaTeX inline/block tokenizer + renderer
- [x] 同文件定义脚注 tokenizer + renderer（`[^N]` 引用和 `[^N]:` 定义）
- [x] 同文件定义 ruby text tokenizer + renderer（`{汉字}(pinyin)` 语法）
- [x] 修改 `src/lib/markdown.ts`：注册所有 extensions
- [x] 引入 katex.min.css（通过 index.html 的 link 标签或 vite import）

## T5: Mermaid 图表渲染 | 复杂度：高

- [x] 安装 mermaid 依赖
- [x] 修改 `src/lib/renderer.ts`：mermaid 代码块输出占位 div（data-chart 存 base64 源码）
- [x] 新增 `src/components/MermaidBlock.tsx`：useEffect 调用 mermaid.render() 渲染 SVG
- [x] 新增 `src/lib/export-png.ts`：SVG → Canvas → PNG 下载通用工具
- [x] MermaidBlock 集成"下载 PNG"按钮
- [x] 修改 `src/App.tsx`：预览区渲染后扫描并挂载 MermaidBlock 组件

## T6: KaTeX 块级公式下载 PNG | 复杂度：中

- [x] 新增 `src/components/KatexBlock.tsx`：块级公式预览 + 下载 PNG 按钮
- [x] 复用 `export-png.ts` 的 DOM → Canvas → PNG 流程
- [x] 修改 `src/App.tsx`：预览区渲染后扫描并挂载 KatexBlock 组件

## T7: 复制时替换不可复制内容 | 复杂度：低

- [x] 修改 `src/lib/clipboard.ts`：复制前扫描 HTML，将 mermaid 占位替换为 `【请插入图片：Mermaid 图表】`
- [x] 块级 KaTeX 占位替换为 `【请插入图片：数学公式】`
- [x] 替换文字使用灰色背景 + 居中样式，粘贴到微信后作为视觉提示

## T8: Titlebar 警告图标 | 复杂度：低

- [x] 修改 `src/App.tsx`：解析 markdown 后检测是否包含 mermaid 代码块或 `$$` 块级公式
- [x] 有则在 header 标题右侧显示橙色 ⚠ 图标
- [x] hover tooltip："文档包含图表或公式，复制后需手动下载图片并插入到公众号编辑器"
- [x] 无相关内容时不渲染图标

## T9: 脚注底部区块排序 | 复杂度：低

- [x] 确保 renderMarkdown 输出的 HTML 末尾区块顺序：正文 → 脚注区块 → 外链引用区块
- [x] 两个区块各自有分隔线和小标题（"注释" / "参考链接"）
