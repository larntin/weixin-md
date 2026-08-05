import type { ThemeStyles } from './theme';

/**
 * 素笺 · Ink
 * 国风雅致风 —— 适合文化 / 读书 / 随笔类公众号文章。
 * 标题使用衬线字体（Noto Serif SC / 系统宋体），正文用无衬线，营造纸感。
 * 设计思路见同级 设计思路.md。
 */
export const inkTheme: ThemeStyles = {
  h1: { fontSize: '26px', fontWeight: '700', color: '#2B2620', marginTop: '38px', marginBottom: '18px', lineHeight: '1.4', letterSpacing: '0.4px', fontFamily: "'Noto Serif SC', 'Songti SC', 'SimSun', serif" },
  h2: { fontSize: '19px', fontWeight: '700', color: '#B23A2E', marginTop: '30px', marginBottom: '14px', lineHeight: '1.45', letterSpacing: '0.2px', fontFamily: "'Noto Serif SC', 'Songti SC', 'SimSun', serif" },
  h3: { fontSize: '17px', fontWeight: '700', color: '#2B2620', marginTop: '26px', marginBottom: '12px', lineHeight: '1.45', fontFamily: "'Noto Serif SC', 'Songti SC', 'SimSun', serif" },
  h4: { fontSize: '15px', fontWeight: '700', color: '#2B2620', marginTop: '22px', marginBottom: '10px', lineHeight: '1.45' },
  h5: { fontSize: '14px', fontWeight: '700', color: '#3F392F', marginTop: '18px', marginBottom: '8px', lineHeight: '1.45' },
  h6: { fontSize: '13px', fontWeight: '700', color: '#6E665A', marginTop: '16px', marginBottom: '8px', lineHeight: '1.45' },
  p: { fontSize: '16px', lineHeight: '1.9', color: '#4A4339', marginTop: '0px', marginBottom: '20px', wordBreak: 'break-word' as const },
  blockquote: { borderLeft: '4px solid #B23A2E', paddingLeft: '18px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '18px', marginLeft: '0px', marginRight: '0px', marginTop: '0px', marginBottom: '20px', backgroundColor: '#F6E4DE', borderRadius: '4px' },
  blockquoteP: { fontSize: '15px', lineHeight: '1.8', color: '#6E665A', marginTop: '0px', marginBottom: '0px', fontStyle: 'italic' },
  ul: { listStyleType: 'disc', paddingLeft: '24px', marginTop: '0px', marginBottom: '20px', fontSize: '16px', lineHeight: '1.85', color: '#4A4339' },
  ol: { listStyleType: 'decimal', paddingLeft: '24px', marginTop: '0px', marginBottom: '20px', fontSize: '16px', lineHeight: '1.85', color: '#4A4339' },
  li: { marginBottom: '6px', lineHeight: '1.85' },
  table: { borderCollapse: 'collapse' as const, width: '100%', marginTop: '0px', marginBottom: '20px', fontSize: '14px', lineHeight: '1.7', borderRadius: '4px', overflow: 'hidden' as const },
  thead: { backgroundColor: '#F6E4DE' },
  th: { border: '1px solid #E5DCD2', padding: '10px 14px', fontWeight: '700', textAlign: 'left' as const, color: '#2B2620' },
  td: { border: '1px solid #E5DCD2', padding: '10px 14px', textAlign: 'left' as const, color: '#4A4339' },
  tr: {},
  trOdd: { backgroundColor: '#FCFBF7' },
  hr: { border: 'none', borderTop: '1px solid #E5DCD2', marginTop: '30px', marginBottom: '30px' },
  a: { color: '#B23A2E', textDecoration: 'none', borderBottom: '1px solid rgba(178, 58, 46, 0.35)', wordBreak: 'break-all' as const },
  img: { maxWidth: '100%', display: 'block', marginTop: '12px', marginBottom: '12px', borderRadius: '4px' },
  strong: { fontWeight: '700', color: '#2B2620' },
  em: { fontStyle: 'italic', color: '#6E665A' },
  del: { textDecoration: 'line-through', color: '#9E9488' },
  codeInline: { backgroundColor: '#F6E4DE', color: '#B23A2E', padding: '2px 8px', borderRadius: '3px', fontSize: '14px', fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace" },
  codeBlock: { fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace", fontSize: '13px', lineHeight: '1.7', display: 'block', overflowX: 'auto' as const, color: '#E9E3D8' },
  pre: { backgroundColor: '#2B2620', padding: '18px', borderRadius: '4px', overflowX: 'auto' as const, marginTop: '0px', marginBottom: '20px', fontSize: '13px', lineHeight: '1.7' },
};
