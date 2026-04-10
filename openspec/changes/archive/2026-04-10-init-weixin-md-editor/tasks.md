## 1. Project Setup

- [x] 1.1 Initialize Vite + React + TypeScript project with `npm create vite@latest`
- [x] 1.2 Install and configure TailwindCSS v4
- [x] 1.3 Install dependencies: marked, highlight.js
- [x] 1.4 Clean up default Vite boilerplate files

## 2. Theme and Style System

- [x] 2.1 Create theme type definitions (TypeScript interface mapping element types to CSS properties)
- [x] 2.2 Implement default theme object with inline styles for all Markdown elements (h1-h6, p, blockquote, ul, ol, li, table, td, th, hr, a, img, code, pre)
- [x] 2.3 Create utility function to convert CSS property object to inline style string

## 3. WeChat-Compatible HTML Renderer

- [x] 3.1 Create custom marked renderer that injects inline styles from theme for each element type
- [x] 3.2 Implement list rendering with explicit `list-style-type` and `padding-left` inline styles to prevent WeChat reset
- [x] 3.3 Implement blockquote rendering with `border-left` inline style
- [x] 3.4 Implement table rendering with inline border, padding, and alignment styles on `<table>`, `<tr>`, `<td>`, `<th>`
- [x] 3.5 Implement link rendering with inline color and text-decoration styles
- [x] 3.6 Implement image rendering with inline `max-width: 100%` style

## 4. Code Highlight

- [x] 4.1 Integrate highlight.js for fenced code block syntax highlighting
- [x] 4.2 Convert highlight.js CSS class-based output to inline styles per token (map hljs classes to color values)
- [x] 4.3 Style code block container (`<pre>` + `<code>`) with inline background, padding, border-radius, font-family
- [x] 4.4 Style inline code (`<code>` without `<pre>`) with background, padding, border-radius, font-size

## 5. Editor UI

- [x] 5.1 Create App layout component with left-right split pane using TailwindCSS flexbox
- [x] 5.2 Create Markdown editor panel with `<textarea>` and state management
- [x] 5.3 Create preview panel that renders the WeChat-compatible HTML output
- [x] 5.4 Wire up real-time preview: editor content changes trigger re-render within 300ms (debounced)
- [x] 5.5 Add toolbar/header with app title and copy button

## 6. Clipboard Copy

- [x] 6.1 Implement copy function using `navigator.clipboard.write()` with `text/html` Blob
- [x] 6.2 Implement fallback copy using `document.execCommand('copy')` with hidden contenteditable element
- [x] 6.3 Add copy success/failure feedback UI (toast notification or button state change)
- [x] 6.4 Disable or warn on copy when editor content is empty

## 7. Verification

- [x] 7.1 Test rendered HTML output contains only inline styles and no `<style>` tags
- [x] 7.2 Test rendered HTML uses only WeChat-supported tags
- [ ] 7.3 Test copy-paste into WeChat Official Account editor preserves styles (manual verification)
- [x] 7.4 Test code block highlighting renders with inline styles
- [x] 7.5 Test list rendering preserves bullet/number styles after paste
