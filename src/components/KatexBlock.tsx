import { useRef } from 'react';
import katex from 'katex';
import { downloadDomAsPng } from '../lib/export-png';

type Props = { katex: string };

export function KatexBlock({ katex: encodedTex }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  let html: string;
  try {
    const tex = decodeURIComponent(escape(atob(encodedTex)));
    html = katex.renderToString(tex, { displayMode: true, throwOnError: false });
  } catch {
    html = '<span style="color: red;">Failed to render LaTeX</span>';
  }

  const handleDownload = () => {
    if (contentRef.current) {
      downloadDomAsPng(contentRef.current, 'katex-formula.png');
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
      <button
        onClick={handleDownload}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '4px 10px',
          fontSize: '12px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        下载 PNG
      </button>
    </div>
  );
}
