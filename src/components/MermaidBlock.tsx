import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { downloadSvgAsPng } from '../lib/export-png';

mermaid.initialize({ startOnLoad: false, theme: 'default' });

let mermaidIdCounter = 0;

type Props = { chart: string };

export function MermaidBlock({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = containerRef.current;
    if (!el) return;

    const decoded = decodeURIComponent(atob(chart));
    const id = `mermaid-${++mermaidIdCounter}`;

    (async () => {
      try {
        const { svg } = await mermaid.render(id, decoded);
        if (cancelled) return;
        el.innerHTML = svg;
        setError(null);
      } catch (err) {
        if (cancelled) return;
        el.innerHTML = '';
        setError(err instanceof Error ? err.message : String(err));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  const handleDownload = () => {
    const svg = containerRef.current?.querySelector('svg');
    if (svg) {
      downloadSvgAsPng(svg, 'mermaid-chart.png');
    }
  };

  return (
    <div style={{ position: 'relative', padding: '16px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '16px', textAlign: 'center' }}>
      <div ref={containerRef} />
      {error && (
        <div style={{ color: 'red', fontSize: '13px', padding: '8px' }}>{error}</div>
      )}
      {!error && (
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
      )}
    </div>
  );
}
