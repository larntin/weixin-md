import { useState, useMemo, useCallback, useRef } from 'react';
import { renderMarkdown } from './lib/markdown';
import { copyHtmlToClipboard } from './lib/clipboard';
import { MarkdownEditor } from './components/MarkdownEditor';

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
`;

function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [dark, setDark] = useState(true);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const renderedHtml = useMemo(() => {
    if (!markdown.trim()) return '';
    return renderMarkdown(markdown);
  }, [markdown]);

  const handleCopy = useCallback(async () => {
    if (!renderedHtml.trim()) return;
    try {
      await copyHtmlToClipboard(renderedHtml);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyStatus('idle'), 2000);
  }, [renderedHtml]);

  const copyButtonText = copyStatus === 'success'
    ? '已复制!'
    : copyStatus === 'error'
    ? '复制失败'
    : '复制到公众号';

  return (
    <div className="flex flex-col h-screen" style={dark ? { backgroundColor: '#282c34' } : undefined}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-3 shrink-0 border-b ${
        dark ? 'border-gray-700' : 'bg-white border-gray-200'
      }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
        <h1 className={`text-lg font-semibold ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
          微信公众号 Markdown 编辑器
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
              dark ? 'text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={dark ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.061-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.061-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.061ZM5.404 6.464a.75.75 0 0 0 1.06-1.06L5.404 4.343a.75.75 0 1 0-1.06 1.06l1.06 1.061Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button
            onClick={handleCopy}
            disabled={!renderedHtml.trim()}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              copyStatus === 'success'
                ? 'bg-green-500 text-white'
                : copyStatus === 'error'
                ? 'bg-red-500 text-white'
                : renderedHtml.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : dark
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {copyButtonText}
          </button>
        </div>
      </header>

      {/* Editor + Preview */}
      <div className="flex flex-1 min-h-0">
        {/* Editor Panel */}
        <div className={`flex flex-col w-1/2 border-r ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className={`px-4 py-2 text-xs font-medium border-b ${
            dark ? 'text-gray-400 border-gray-600' : 'text-gray-500 bg-gray-100 border-gray-200'
          }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
            Markdown
          </div>
          <MarkdownEditor value={markdown} onChange={setMarkdown} dark={dark} />
        </div>

        {/* Preview Panel */}
        <div className="flex flex-col w-1/2">
          <div className={`px-4 py-2 text-xs font-medium border-b ${
            dark ? 'text-gray-400 border-gray-600' : 'text-gray-500 bg-gray-100 border-gray-200'
          }`} style={dark ? { backgroundColor: '#282c34' } : undefined}>
            预览
          </div>
          <div
            className={`flex-1 p-6 overflow-y-auto ${dark ? '' : 'bg-white'}`}
            style={dark ? { backgroundColor: '#282c34' } : undefined}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
