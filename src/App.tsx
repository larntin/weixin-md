import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { renderMarkdown } from './lib/markdown';
import { copyHtmlToClipboard, prepareHtmlForCopy } from './lib/clipboard';
import { MarkdownEditor } from './components/MarkdownEditor';
import { PreviewToolbar } from './components/PreviewToolbar';
import { StyleSidebar, type StylePreset } from './components/StyleSidebar';
import { MermaidBlock } from './components/MermaidBlock';
import { KatexBlock } from './components/KatexBlock';

const SAMPLE_MD = `# 微信公众号 Markdown 编辑器

## 功能特性

这是一个**简洁高效**的 Markdown 编辑器，支持：

- 实时预览
- 一键复制到微信公众号
- 代码语法高亮
- 表格支持

## 代码示例

### JavaScript / TypeScript

\`\`\`javascript
// 箭头函数、解构、模板字符串
const greet = ({ name, age }) => {
  if (age >= 18) {
    console.log(\`Hello, \${name}! (adult)\`);
    return { status: "ok", code: 200 };
  }
  return null;
};

// async/await + try/catch
async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items.filter((item) => item.active);
  } catch (err) {
    console.error("Failed:", err.message);
    throw new Error(\`Request failed: \${err}\`);
  }
}

// class 语法
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    (this.listeners[event] ||= []).push(callback);
  }

  emit(event, ...args) {
    for (const fn of this.listeners[event] || []) {
      fn(...args);
    }
  }
}
\`\`\`

### Python

\`\`\`python
from typing import Optional, List, Dict

class DataProcessor:
    """数据处理器"""

    def __init__(self, config: Dict[str, str]):
        self.config = config
        self._cache: Dict[str, List] = {}

    def process(self, items: List[dict]) -> Optional[dict]:
        results = [
            {"id": item["id"], "value": item.get("value", 0) * 2}
            for item in items
            if item.get("active", False)
        ]
        return results[0] if results else None

    @staticmethod
    def validate(data: dict) -> bool:
        return all(k in data for k in ("id", "name", "value"))

# 使用示例
if __name__ == "__main__":
    proc = DataProcessor({"mode": "fast"})
    result = proc.process([
        {"id": 1, "value": 10, "active": True},
        {"id": 2, "value": 20, "active": False},
    ])
    print(f"Result: {result}")
\`\`\`

### HTML / CSS

\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <style>
    .container {
      display: flex;
      gap: 16px;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
    }
    .card {
      flex: 1;
      padding: 16px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
  </div>
  <script>
    document.querySelectorAll('.card').forEach((el, i) => {
      el.addEventListener('click', () => alert(\`Card \${i + 1}\`));
    });
  </script>
</body>
</html>
\`\`\`

### SQL

\`\`\`sql
SELECT
    u.id,
    u.username,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= '2024-01-01'
    AND u.status != 'deleted'
GROUP BY u.id, u.username
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 20;
\`\`\`

### Shell

\`\`\`bash
#!/bin/bash
set -euo pipefail

# 部署脚本
deploy() {
    local env="\${1:-production}"
    echo "Deploying to $env..."

    if [[ "$env" == "production" ]]; then
        npm run build && npm run test
        docker build -t myapp:latest .
        docker push myapp:latest
    fi
}

deploy "$@"
\`\`\`

行内代码：使用 \`const x = 42;\` 定义变量，调用 \`Array.from({ length: 10 }, (_, i) => i * 2)\` 生成数组。

## 引用

> 这是一段引用文字，用于展示 blockquote 的样式效果。
>
> **加粗引用**和 \`代码引用\` 也可以嵌套使用。

## 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| Markdown 解析 | ✅ | 支持 GFM 扩展语法 |
| 代码高亮 | ✅ | highlight.js 自动检测 |
| 一键复制 | ✅ | Clipboard API + fallback |
| 内联样式 | ✅ | 微信编辑器兼容 |

## 列表

### 无序列表

- 第一层级
  - 第二层级
  - 第二层级
- 另一个一层级

### 有序列表

1. 第一步：安装依赖
2. 第二步：配置项目
3. 第三步：启动服务

---

*斜体文字* 和 **加粗文字** 以及 ~~删除线~~ 混合排版测试。

## Mermaid 图表

\`\`\`mermaid
graph LR
    A[Markdown] --> B[marked 解析]
    B --> C[内联样式 HTML]
    C --> D[预览]
    D --> E[复制到公众号]
\`\`\`

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$

## 脚注

这是一段带脚注的文字[^1]。

[^1]: 这是脚注的内容。

## 注音

{漢字}(hànzì) 是中国文字。
`;

const STYLE_PRESETS: StylePreset[] = [
  { id: 'warm-sun', name: '暖阳', enName: 'Warm Sun', accent: '#D98E4F' },
  { id: 'ink', name: '素笺', enName: 'Ink', accent: '#B23A2E' },
  { id: 'fresh', name: '清露', enName: 'Fresh', accent: '#1F9E8E' },
];

function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [themeId, setThemeId] = useState('warm-sun');
  const [linkToFootnote, setLinkToFootnote] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const previewRef = useRef<HTMLDivElement>(null);

  // 主题模式：亮色 / 深色 / 跟随系统
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const dark = themeMode === 'dark' || (themeMode === 'system' && systemDark);

  const renderedHtml = useMemo(() => {
    if (!markdown.trim()) return '';
    return renderMarkdown(markdown, themeId, 'blue', linkToFootnote);
  }, [markdown, themeId, linkToFootnote]);

  const handleCopy = useCallback(async () => {
    if (!renderedHtml.trim()) return;
    try {
      const prepared = prepareHtmlForCopy(renderedHtml);
      await copyHtmlToClipboard(prepared);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyStatus('idle'), 2000);
  }, [renderedHtml]);

  // Mount MermaidBlock and KatexBlock into placeholder divs via DOM
  useEffect(() => {
    const container = previewRef.current;
    if (!container) return;

    const roots: { root: ReturnType<typeof createRoot>; wrapper: HTMLElement }[] = [];

    container.querySelectorAll('.mermaid-placeholder').forEach((el) => {
      const chart = el.getAttribute('data-chart') || '';
      const wrapper = document.createElement('div');
      el.textContent = '';
      el.appendChild(wrapper);
      const root = createRoot(wrapper);
      root.render(<MermaidBlock chart={chart} />);
      roots.push({ root, wrapper });
    });

    container.querySelectorAll('.katex-block').forEach((el) => {
      const tex = el.getAttribute('data-katex') || '';
      const wrapper = document.createElement('div');
      el.textContent = '';
      el.appendChild(wrapper);
      const root = createRoot(wrapper);
      root.render(<KatexBlock katex={tex} />);
      roots.push({ root, wrapper });
    });

    return () => roots.forEach(({ root }) => root.unmount());
  }, [renderedHtml]);

  return (
    <div className="flex flex-col h-screen overflow-hidden lg:overflow-hidden" style={dark ? { backgroundColor: '#282c34' } : undefined}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-[7px] lg:py-3 shrink-0 border-b ${
        dark ? 'border-gray-700' : 'bg-white border-gray-200'
      }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
        <div className="flex items-center gap-3">
          <h1 className={`text-lg font-semibold ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
            武汉醉鱼 - 微信公众号MD样式
          </h1>
        </div>
        <button
          onClick={() =>
            setThemeMode((m) => (m === 'light' ? 'dark' : m === 'dark' ? 'system' : 'light'))
          }
          className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
            dark ? 'text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={
            themeMode === 'light'
              ? '当前：亮色（点击切换）'
              : themeMode === 'dark'
              ? '当前：深色（点击切换）'
              : '当前：跟随系统（点击切换）'
          }
        >
          {themeMode === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : themeMode === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m-9-1.5V6a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3Z" />
            </svg>
          )}
        </button>
      </header>

      {/* 可滚动内容区：H5 整区滚动（样式栏+编辑器+预览），PC 由内部面板各自滚动 */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto lg:overflow-hidden">

        {/* H5：横向滑动样式选择栏（窄屏显示） */}
        <StyleSidebar
          variant="horizontal"
          presets={STYLE_PRESETS}
          selectedId={themeId}
          onSelect={setThemeId}
          dark={dark}
          className="lg:hidden"
        />

        {/* 主体：PC 三栏（竖向样式栏 + 编辑器 + 预览），H5 纵向堆叠 */}
        <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
        {/* PC：竖向样式栏（宽屏显示） */}
        <StyleSidebar
          variant="vertical"
          presets={STYLE_PRESETS}
          selectedId={themeId}
          onSelect={setThemeId}
          dark={dark}
          className="hidden lg:flex"
        />

        {/* Editor Panel */}
        <div
          className={`flex flex-col h-[500px] border-b lg:h-auto lg:flex-1 lg:min-h-0 lg:min-w-0 lg:border-b-0 lg:border-r ${
            dark ? 'border-gray-600' : 'border-gray-200'
          }`}
        >
          <div className={`flex items-center justify-between h-9 px-4 text-xs font-medium border-b shrink-0 ${
            dark ? 'text-gray-400 border-gray-600' : 'text-gray-500 bg-gray-100 border-gray-200'
          }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
            <span>Markdown</span>
            <button
              type="button"
              onClick={() => setMarkdown('')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                dark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'
              }`}
              title="清空编辑器内容"
            >
              清空
            </button>
          </div>
          <MarkdownEditor value={markdown} onChange={setMarkdown} dark={dark} />
        </div>

        {/* Preview Panel */}
        <div className="flex flex-col min-h-0 lg:flex-1 lg:min-w-0">
          <div className={`flex items-center justify-between h-9 px-4 text-xs font-medium border-b shrink-0 ${
            dark ? 'text-gray-400 border-gray-600' : 'text-gray-500 bg-gray-100 border-gray-200'
          }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
            <span>预览</span>
            <PreviewToolbar
              linkToFootnote={linkToFootnote}
              onLinkToFootnoteChange={setLinkToFootnote}
              onCopy={handleCopy}
              copyStatus={copyStatus}
              disabled={!renderedHtml.trim()}
              dark={dark}
            />
          </div>
          <div
            ref={previewRef}
            className="p-6 bg-white lg:flex-1 lg:overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  </div>
);
}

export default App;
