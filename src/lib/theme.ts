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

export type ColorPalette = {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  link: string;
  codeInline: string;
};

export type ThemeDefinition = {
  id: string;
  name: string;
  styles: ThemeStyles;
};

// ─── Default Theme (经典) ────────────────────────────────────────────

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

// ─── Grace Theme (优雅) ─────────────────────────────────────────────

const graceTheme: ThemeStyles = {
  h1: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: '36px',
    marginBottom: '18px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e0e0e0',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.04)',
  },
  h2: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: '32px',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e8e8e8',
    lineHeight: '1.5',
    letterSpacing: '0.3px',
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.04)',
  },
  h3: {
    fontSize: '19px',
    fontWeight: '600',
    color: '#2c2c2c',
    marginTop: '28px',
    marginBottom: '14px',
    lineHeight: '1.5',
    letterSpacing: '0.2px',
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.03)',
  },
  h4: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c2c2c',
    marginTop: '22px',
    marginBottom: '10px',
    lineHeight: '1.5',
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.03)',
  },
  h5: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#444',
    marginTop: '18px',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  h6: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    marginTop: '16px',
    marginBottom: '8px',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  p: {
    fontSize: '15px',
    lineHeight: '1.85',
    color: '#3a3a3a',
    marginTop: '0px',
    marginBottom: '18px',
    wordBreak: 'break-word' as const,
    letterSpacing: '0.2px',
  },
  blockquote: {
    borderLeft: '4px solid #d0d0d0',
    paddingLeft: '20px',
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingRight: '20px',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    marginBottom: '18px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
  },
  blockquoteP: {
    fontSize: '15px',
    lineHeight: '1.85',
    color: '#555',
    marginTop: '0px',
    marginBottom: '0px',
    fontStyle: 'italic',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '15px',
    lineHeight: '1.85',
    color: '#3a3a3a',
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '15px',
    lineHeight: '1.85',
    color: '#3a3a3a',
  },
  li: {
    marginBottom: '6px',
    lineHeight: '1.85',
  },
  table: {
    borderCollapse: 'collapse' as const,
    width: '100%',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '14px',
    lineHeight: '1.7',
    borderRadius: '6px',
    overflow: 'hidden' as const,
  },
  thead: {
    backgroundColor: '#f5f5f5',
  },
  th: {
    border: '1px solid #e0e0e0',
    padding: '10px 14px',
    fontWeight: '600',
    textAlign: 'left' as const,
    color: '#1a1a1a',
    letterSpacing: '0.3px',
  },
  td: {
    border: '1px solid #e0e0e0',
    padding: '10px 14px',
    textAlign: 'left' as const,
    color: '#3a3a3a',
  },
  tr: {},
  trOdd: {
    backgroundColor: '#fafafa',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    marginTop: '28px',
    marginBottom: '28px',
  },
  a: {
    color: '#576b95',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(87, 107, 149, 0.3)',
    wordBreak: 'break-all' as const,
  },
  img: {
    maxWidth: '100%',
    display: 'block',
    marginTop: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  strong: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
  em: {
    fontStyle: 'italic',
    color: '#555',
  },
  del: {
    textDecoration: 'line-through',
    color: '#aaa',
  },
  codeInline: {
    backgroundColor: '#fff5f5',
    color: '#ff502c',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '13px',
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  codeBlock: {
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: '13px',
    lineHeight: '1.7',
    display: 'block',
    overflowX: 'auto' as const,
    color: '#abb2bf',
  },
  pre: {
    backgroundColor: '#282c34',
    padding: '18px',
    borderRadius: '8px',
    overflowX: 'auto' as const,
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '13px',
    lineHeight: '1.7',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
};

// ─── Simple Theme (极简) ────────────────────────────────────────────

const simpleTheme: ThemeStyles = {
  h1: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111',
    marginTop: '40px',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  h2: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111',
    marginTop: '36px',
    marginBottom: '18px',
    lineHeight: '1.3',
  },
  h3: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#222',
    marginTop: '32px',
    marginBottom: '14px',
    lineHeight: '1.3',
  },
  h4: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#222',
    marginTop: '28px',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  h5: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
    marginTop: '24px',
    marginBottom: '10px',
    lineHeight: '1.3',
  },
  h6: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    marginTop: '20px',
    marginBottom: '8px',
    lineHeight: '1.3',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  p: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#333',
    marginTop: '0px',
    marginBottom: '20px',
    wordBreak: 'break-word' as const,
  },
  blockquote: {
    borderLeft: '3px solid #ccc',
    paddingLeft: '16px',
    paddingTop: '4px',
    paddingBottom: '4px',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    marginBottom: '20px',
  },
  blockquoteP: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#666',
    marginTop: '0px',
    marginBottom: '0px',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '24px',
    marginTop: '0px',
    marginBottom: '20px',
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#333',
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: '24px',
    marginTop: '0px',
    marginBottom: '20px',
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#333',
  },
  li: {
    marginBottom: '6px',
    lineHeight: '1.8',
  },
  table: {
    borderCollapse: 'collapse' as const,
    width: '100%',
    marginTop: '0px',
    marginBottom: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  thead: {
    backgroundColor: '#f8f8f8',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px 12px',
    fontWeight: '600',
    textAlign: 'left' as const,
    color: '#111',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '10px 12px',
    textAlign: 'left' as const,
    color: '#333',
  },
  tr: {},
  trOdd: {
    backgroundColor: '#fcfcfc',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #eee',
    marginTop: '32px',
    marginBottom: '32px',
  },
  a: {
    color: '#576b95',
    textDecoration: 'none',
    wordBreak: 'break-all' as const,
  },
  img: {
    maxWidth: '100%',
    display: 'block',
    marginTop: '12px',
    marginBottom: '12px',
    borderRadius: '2px',
  },
  strong: {
    fontWeight: '600',
    color: '#111',
  },
  em: {
    fontStyle: 'italic',
  },
  del: {
    textDecoration: 'line-through',
    color: '#aaa',
  },
  codeInline: {
    backgroundColor: '#f5f5f5',
    color: '#e64a19',
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
    borderRadius: '2px 10px 10px 2px',
    overflowX: 'auto' as const,
    marginTop: '0px',
    marginBottom: '20px',
    fontSize: '13px',
    lineHeight: '1.6',
  },
};

// ─── Modern Theme (现代) ────────────────────────────────────────────

const modernTheme: ThemeStyles = {
  h1: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#111',
    marginTop: '40px',
    marginBottom: '20px',
    lineHeight: '1.35',
    letterSpacing: '-0.3px',
  },
  h2: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    marginTop: '36px',
    marginBottom: '16px',
    lineHeight: '1.4',
    backgroundColor: '#1a1a1a',
    borderRadius: '20px',
    padding: '4px 16px',
    display: 'inline-block' as const,
  },
  h3: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#222',
    marginTop: '30px',
    marginBottom: '14px',
    lineHeight: '1.4',
  },
  h4: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#333',
    marginTop: '24px',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  h5: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#444',
    marginTop: '20px',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  h6: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#666',
    marginTop: '18px',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  p: {
    fontSize: '15px',
    lineHeight: '2.0',
    color: '#333',
    marginTop: '0px',
    marginBottom: '18px',
    wordBreak: 'break-word' as const,
  },
  blockquote: {
    borderLeft: '4px solid #ddd',
    paddingLeft: '20px',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingRight: '20px',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    marginBottom: '18px',
    backgroundColor: '#f9f9f9',
    borderRadius: '16px',
  },
  blockquoteP: {
    fontSize: '15px',
    lineHeight: '2.0',
    color: '#555',
    marginTop: '0px',
    marginBottom: '0px',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '15px',
    lineHeight: '2.0',
    color: '#333',
  },
  ol: {
    listStyleType: 'decimal',
    paddingLeft: '28px',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '15px',
    lineHeight: '2.0',
    color: '#333',
  },
  li: {
    marginBottom: '6px',
    lineHeight: '2.0',
  },
  table: {
    borderCollapse: 'separate' as const,
    borderSpacing: '0',
    width: '100%',
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '14px',
    lineHeight: '1.7',
    borderRadius: '12px',
    overflow: 'hidden' as const,
    border: '1px solid #e5e5e5',
  },
  thead: {
    backgroundColor: '#f0f0f0',
  },
  th: {
    padding: '12px 16px',
    fontWeight: '700',
    textAlign: 'left' as const,
    color: '#111',
    borderBottom: '2px solid #e0e0e0',
  },
  td: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    color: '#333',
    borderBottom: '1px solid #eee',
  },
  tr: {},
  trOdd: {
    backgroundColor: '#fafafa',
  },
  hr: {
    border: 'none',
    borderTop: '2px solid #f0f0f0',
    marginTop: '30px',
    marginBottom: '30px',
  },
  a: {
    color: '#576b95',
    textDecoration: 'none',
    fontWeight: '500',
    wordBreak: 'break-all' as const,
  },
  img: {
    maxWidth: '100%',
    display: 'block',
    marginTop: '12px',
    marginBottom: '12px',
    borderRadius: '16px',
  },
  strong: {
    fontWeight: '800',
    color: '#111',
  },
  em: {
    fontStyle: 'italic',
  },
  del: {
    textDecoration: 'line-through',
    color: '#aaa',
  },
  codeInline: {
    backgroundColor: '#fff5f5',
    color: '#ff502c',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '13px',
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
  codeBlock: {
    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    fontSize: '13px',
    lineHeight: '1.7',
    display: 'block',
    overflowX: 'auto' as const,
    color: '#abb2bf',
  },
  pre: {
    backgroundColor: '#282c34',
    padding: '20px',
    borderRadius: '16px',
    overflowX: 'auto' as const,
    marginTop: '0px',
    marginBottom: '18px',
    fontSize: '13px',
    lineHeight: '1.7',
  },
};

// ─── Theme List ─────────────────────────────────────────────────────

export const themeList: ThemeDefinition[] = [
  { id: 'default', name: '经典', styles: defaultTheme },
  { id: 'grace', name: '优雅', styles: graceTheme },
  { id: 'simple', name: '极简', styles: simpleTheme },
  { id: 'modern', name: '现代', styles: modernTheme },
];

// ─── Color Palettes ─────────────────────────────────────────────────

export const paletteList: ColorPalette[] = [
  { id: 'blue',      name: '蓝',    primary: '#0F4C81', primaryLight: '#E8F0FE', link: '#0F4C81', codeInline: '#D97757' },
  { id: 'deepblue',  name: '深蓝',  primary: '#1B3A5C', primaryLight: '#E3EAF2', link: '#1B3A5C', codeInline: '#C97A4B' },
  { id: 'green',     name: '绿',    primary: '#2E7D32', primaryLight: '#E8F5E9', link: '#2E7D32', codeInline: '#D97757' },
  { id: 'darkgreen', name: '墨绿',  primary: '#1B5E20', primaryLight: '#E0F2E1', link: '#1B5E20', codeInline: '#C97A4B' },
  { id: 'purple',    name: '紫',    primary: '#6A1B9A', primaryLight: '#F3E5F5', link: '#6A1B9A', codeInline: '#E06540' },
  { id: 'indigo',    name: '靛蓝',  primary: '#283593', primaryLight: '#E8EAF6', link: '#283593', codeInline: '#D97757' },
  { id: 'red',       name: '红',    primary: '#C62828', primaryLight: '#FFEBEE', link: '#C62828', codeInline: '#6A1B9A' },
  { id: 'orange',    name: '橙',    primary: '#D97757', primaryLight: '#FFF3E0', link: '#BF5B3A', codeInline: '#6A1B9A' },
  { id: 'brown',     name: '棕',    primary: '#5D4037', primaryLight: '#EFEBE9', link: '#5D4037', codeInline: '#D97757' },
  { id: 'cyan',      name: '青',    primary: '#00838F', primaryLight: '#E0F7FA', link: '#00838F', codeInline: '#D97757' },
  { id: 'pink',      name: '粉',    primary: '#AD1457', primaryLight: '#FCE4EC', link: '#AD1457', codeInline: '#6A1B9A' },
  { id: 'gray',      name: '灰',    primary: '#546E7A', primaryLight: '#ECEFF1', link: '#546E7A', codeInline: '#D97757' },
  { id: 'black',     name: '黑',    primary: '#212121', primaryLight: '#F5F5F5', link: '#212121', codeInline: '#D97757' },
];

// ─── Build Theme ────────────────────────────────────────────────────

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function buildTheme(themeId: string, paletteId: string): ThemeStyles {
  const themeDef = themeList.find((t) => t.id === themeId) ?? themeList[0];
  const palette = paletteList.find((p) => p.id === paletteId) ?? paletteList[0];

  const styles = deepClone(themeDef.styles);

  // h2: apply palette color to background (modern) or border/color
  if (themeDef.id === 'modern') {
    styles.h2.backgroundColor = palette.primary;
    styles.h2.color = '#fff';
  } else {
    styles.h2.borderBottom = `1px solid ${palette.primary}`;
    styles.h2.color = palette.primary;
  }

  // blockquote border uses primary
  styles.blockquote.borderLeft = `4px solid ${palette.primary}`;

  // link color
  styles.a.color = palette.link;
  if (styles.a.borderBottom) {
    styles.a.borderBottom = `1px solid ${palette.link}`;
  }

  // inline code
  styles.codeInline.color = palette.codeInline;
  styles.codeInline.backgroundColor = palette.primaryLight;

  // thead background
  styles.thead.backgroundColor = palette.primaryLight;

  return styles;
}

// ─── Utility ────────────────────────────────────────────────────────

export function cssPropertiesToString(style: CSSProperties): string {
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}
