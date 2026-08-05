import type { ThemeStyles } from './theme';

/**
 * 清露 · Fresh
 * 科技清爽风 —— 适合技术 / 产品 / 效率类公众号文章。
 * 纯白底 + 青绿强调，卡片感、利落间距。
 * 设计思路见同级 设计思路.md。
 */
export const freshTheme: ThemeStyles = {
  h1: { fontSize: '25px', fontWeight: '700', color: '#28323A', marginTop: '36px', marginBottom: '18px', lineHeight: '1.4', letterSpacing: '-0.2px' },
  h2: { fontSize: '19px', fontWeight: '700', color: '#1F9E8E', marginTop: '30px', marginBottom: '14px', lineHeight: '1.45', letterSpacing: '0.1px' },
  h3: { fontSize: '17px', fontWeight: '700', color: '#28323A', marginTop: '26px', marginBottom: '12px', lineHeight: '1.45' },
  h4: { fontSize: '15px', fontWeight: '700', color: '#28323A', marginTop: '22px', marginBottom: '10px', lineHeight: '1.45' },
  h5: { fontSize: '14px', fontWeight: '700', color: '#3F4A53', marginTop: '18px', marginBottom: '8px', lineHeight: '1.45' },
  h6: { fontSize: '13px', fontWeight: '700', color: '#6B7681', marginTop: '16px', marginBottom: '8px', lineHeight: '1.45' },
  p: { fontSize: '16px', lineHeight: '1.85', color: '#3F4A53', marginTop: '0px', marginBottom: '18px', wordBreak: 'break-word' as const },
  blockquote: { borderLeft: '4px solid #1F9E8E', paddingLeft: '16px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px', marginLeft: '0px', marginRight: '0px', marginTop: '0px', marginBottom: '18px', backgroundColor: '#E3F2EF', borderRadius: '10px' },
  blockquoteP: { fontSize: '15px', lineHeight: '1.75', color: '#6B7681', marginTop: '0px', marginBottom: '0px' },
  ul: { listStyleType: 'disc', paddingLeft: '24px', marginTop: '0px', marginBottom: '18px', fontSize: '16px', lineHeight: '1.8', color: '#3F4A53' },
  ol: { listStyleType: 'decimal', paddingLeft: '24px', marginTop: '0px', marginBottom: '18px', fontSize: '16px', lineHeight: '1.8', color: '#3F4A53' },
  li: { marginBottom: '6px', lineHeight: '1.8' },
  table: { borderCollapse: 'collapse' as const, width: '100%', marginTop: '0px', marginBottom: '18px', fontSize: '14px', lineHeight: '1.7', borderRadius: '12px', overflow: 'hidden' as const },
  thead: { backgroundColor: '#E3F2EF' },
  th: { border: '1px solid #CDE5E0', padding: '10px 14px', fontWeight: '700', textAlign: 'left' as const, color: '#28323A' },
  td: { border: '1px solid #CDE5E0', padding: '10px 14px', textAlign: 'left' as const, color: '#3F4A53' },
  tr: {},
  trOdd: { backgroundColor: '#F4FAF9' },
  hr: { border: 'none', borderTop: '1px solid #CDE5E0', marginTop: '28px', marginBottom: '28px' },
  a: { color: '#1F9E8E', textDecoration: 'none', borderBottom: '1px solid rgba(31, 158, 142, 0.35)', wordBreak: 'break-all' as const },
  img: { maxWidth: '100%', display: 'block', marginTop: '12px', marginBottom: '12px', borderRadius: '12px' },
  strong: { fontWeight: '700', color: '#28323A' },
  em: { fontStyle: 'italic', color: '#6B7681' },
  del: { textDecoration: 'line-through', color: '#9AA6AE' },
  codeInline: { backgroundColor: '#E3F2EF', color: '#138A7C', padding: '2px 8px', borderRadius: '5px', fontSize: '14px', fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace" },
  codeBlock: { fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace", fontSize: '13px', lineHeight: '1.7', display: 'block', overflowX: 'auto' as const, color: '#D7E4E1' },
  pre: { backgroundColor: '#1E2A2E', padding: '16px', borderRadius: '12px', overflowX: 'auto' as const, marginTop: '0px', marginBottom: '18px', fontSize: '13px', lineHeight: '1.7' },
};
