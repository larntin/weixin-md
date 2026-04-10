import type { CSSProperties } from 'react';

export type ThemeStyles = {
  h1: CSSProperties;
  h2: CSSProperties;
  h3: CSSProperties;
  h4: CSSProperties;
  h5: CSSProperties;
  h6: CSSProperties;
  p: CSSProperties;
  blockquote: CSSProperties;
  blockquoteP: CSSProperties;
  ul: CSSProperties;
  ol: CSSProperties;
  li: CSSProperties;
  table: CSSProperties;
  thead: CSSProperties;
  th: CSSProperties;
  td: CSSProperties;
  tr: CSSProperties;
  trOdd: CSSProperties;
  hr: CSSProperties;
  a: CSSProperties;
  img: CSSProperties;
  strong: CSSProperties;
  em: CSSProperties;
  del: CSSProperties;
  codeInline: CSSProperties;
  codeBlock: CSSProperties;
  pre: CSSProperties;
};

export const defaultTheme: ThemeStyles = {
  h1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: '32px',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e8e8e8',
    lineHeight: '1.4',
  },
  h2: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: '28px',
    marginBottom: '14px',
    paddingBottom: '6px',
    borderBottom: '1px solid #eee',
    lineHeight: '1.4',
  },
  h3: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: '24px',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  h4: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: '20px',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  h5: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '16px',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  h6: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
    marginTop: '16px',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  p: {
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#333',
    marginTop: '0px',
    marginBottom: '16px',
    wordBreak: 'break-word' as const,
  },
  blockquote: {
    borderLeft: '4px solid #dfe2e5',
    paddingLeft: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    marginBottom: '16px',
    backgroundColor: '#f7f7f7',
    borderRadius: '0px 4px 4px 0px',
  },
  blockquoteP: {
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#666',
    marginTop: '0px',
    marginBottom: '0px',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '16px',
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#333',
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '16px',
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#333',
  },
  li: {
    marginBottom: '4px',
    lineHeight: '1.75',
  },
  table: {
    borderCollapse: 'collapse' as const,
    width: '100%',
    marginTop: '0px',
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  thead: {
    backgroundColor: '#f2f2f2',
  },
  th: {
    border: '1px solid #dfe2e5',
    padding: '8px 12px',
    fontWeight: 'bold',
    textAlign: 'left' as const,
    color: '#1a1a1a',
  },
  td: {
    border: '1px solid #dfe2e5',
    padding: '8px 12px',
    textAlign: 'left' as const,
    color: '#333',
  },
  tr: {},
  trOdd: {
    backgroundColor: '#f9f9f9',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #e8e8e8',
    marginTop: '24px',
    marginBottom: '24px',
  },
  a: {
    color: '#576b95',
    textDecoration: 'none',
    borderBottom: '1px solid #576b95',
    wordBreak: 'break-all' as const,
  },
  img: {
    maxWidth: '100%',
    display: 'block',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
  },
  strong: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  em: {
    fontStyle: 'italic',
  },
  del: {
    textDecoration: 'line-through',
    color: '#999',
  },
  codeInline: {
    backgroundColor: '#fff5f5',
    color: '#ff502c',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '13px',
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  codeBlock: {
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: '13px',
    lineHeight: '1.6',
    display: 'block',
    overflowX: 'auto' as const,
    color: '#abb2bf',
  },
  pre: {
    backgroundColor: '#282c34',
    padding: '16px',
    borderRadius: '6px',
    overflowX: 'auto' as const,
    marginTop: '0px',
    marginBottom: '16px',
    fontSize: '13px',
    lineHeight: '1.6',
  },
};

export function cssPropertiesToString(style: CSSProperties): string {
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}
