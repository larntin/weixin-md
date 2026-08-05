import type { ThemeStyles } from './theme';

/**
 * 暖阳 · Warm Sun
 * 温暖治愈风 —— 适合生活方式 / 情感 / 成长类公众号文章。
 * 设计思路见同级 设计思路.md。
 */
export const warmSunTheme: ThemeStyles = {
  h1: { fontSize: '25px', fontWeight: '700', color: '#3A332B', marginTop: '36px', marginBottom: '18px', lineHeight: '1.4', letterSpacing: '0.3px' },
  h2: { fontSize: '19px', fontWeight: '700', color: '#D98E4F', marginTop: '30px', marginBottom: '14px', lineHeight: '1.45', letterSpacing: '0.2px' },
  h3: { fontSize: '17px', fontWeight: '700', color: '#3A332B', marginTop: '26px', marginBottom: '12px', lineHeight: '1.45' },
  h4: { fontSize: '15px', fontWeight: '700', color: '#3A332B', marginTop: '22px', marginBottom: '10px', lineHeight: '1.45' },
  h5: { fontSize: '14px', fontWeight: '700', color: '#4F463D', marginTop: '18px', marginBottom: '8px', lineHeight: '1.45' },
  h6: { fontSize: '13px', fontWeight: '700', color: '#6D6359', marginTop: '16px', marginBottom: '8px', lineHeight: '1.45' },
  p: { fontSize: '16px', lineHeight: '1.85', color: '#5B5249', marginTop: '0px', marginBottom: '18px', wordBreak: 'break-word' as const },
  blockquote: { borderLeft: '4px solid #D98E4F', paddingLeft: '16px', paddingTop: '12px', paddingBottom: '12px', paddingRight: '16px', marginLeft: '0px', marginRight: '0px', marginTop: '0px', marginBottom: '18px', backgroundColor: '#FBEBDD', borderRadius: '8px' },
  blockquoteP: { fontSize: '15px', lineHeight: '1.75', color: '#8A7E70', marginTop: '0px', marginBottom: '0px' },
  ul: { listStyleType: 'disc', paddingLeft: '24px', marginTop: '0px', marginBottom: '18px', fontSize: '16px', lineHeight: '1.8', color: '#5B5249' },
  ol: { listStyleType: 'decimal', paddingLeft: '24px', marginTop: '0px', marginBottom: '18px', fontSize: '16px', lineHeight: '1.8', color: '#5B5249' },
  li: { marginBottom: '6px', lineHeight: '1.8' },
  table: { borderCollapse: 'collapse' as const, width: '100%', marginTop: '0px', marginBottom: '18px', fontSize: '14px', lineHeight: '1.7', borderRadius: '10px', overflow: 'hidden' as const },
  thead: { backgroundColor: '#FBEBDD' },
  th: { border: '1px solid #E8D9C6', padding: '10px 14px', fontWeight: '700', textAlign: 'left' as const, color: '#3A332B' },
  td: { border: '1px solid #E8D9C6', padding: '10px 14px', textAlign: 'left' as const, color: '#5B5249' },
  tr: {},
  trOdd: { backgroundColor: '#FDF9F3' },
  hr: { border: 'none', borderTop: '1px solid #E8D9C6', marginTop: '28px', marginBottom: '28px' },
  a: { color: '#D98E4F', textDecoration: 'none', borderBottom: '1px solid rgba(217, 142, 79, 0.35)', wordBreak: 'break-all' as const },
  img: { maxWidth: '100%', display: 'block', marginTop: '12px', marginBottom: '12px', borderRadius: '12px' },
  strong: { fontWeight: '700', color: '#3A332B' },
  em: { fontStyle: 'italic', color: '#6D6359' },
  del: { textDecoration: 'line-through', color: '#A59A8E' },
  codeInline: { backgroundColor: '#FBEBDD', color: '#C2703A', padding: '2px 8px', borderRadius: '5px', fontSize: '14px', fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace" },
  codeBlock: { fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace", fontSize: '13px', lineHeight: '1.7', display: 'block', overflowX: 'auto' as const, color: '#E8E0D5' },
  pre: { backgroundColor: '#2E2A26', padding: '16px', borderRadius: '10px', overflowX: 'auto' as const, marginTop: '0px', marginBottom: '18px', fontSize: '13px', lineHeight: '1.7' },
};
