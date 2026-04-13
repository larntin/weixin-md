import { Renderer } from 'marked';
import hljs from 'highlight.js';
import { defaultTheme, cssPropertiesToString } from './theme';
import type { ThemeStyles } from './theme';
import { hljsClassToStyle } from './hljs-inline';

let footnoteLinks: { href: string; text: string }[] = [];
let linkCounter = 0;

export function getFootnoteLinksHtml(): string {
  if (footnoteLinks.length === 0) return '';
  const items = footnoteLinks
    .map(
      (link, i) =>
        `<p style="font-size: 12px; color: #999; word-break: break-all; margin-bottom: 4px;">[${i + 1}] ${link.href}</p>`
    )
    .join('\n');
  return `<section style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
  <p style="font-size: 13px; color: #999; margin-bottom: 8px; font-weight: bold;">参考链接</p>
  ${items}
</section>`;
}

export function resetFootnoteLinks(): void {
  footnoteLinks = [];
  linkCounter = 0;
}

export function createWechatRenderer(theme: ThemeStyles = defaultTheme, linkToFootnote: boolean = false): Renderer {
  const renderer = new Renderer();

  // Block-level elements need `this.parser.parseInline(tokens)` to render inline content
  renderer.heading = function ({ tokens, depth }) {
    const tag = `h${depth}` as keyof ThemeStyles;
    const style = cssPropertiesToString(theme[tag] || theme.h1);
    const text = this.parser.parseInline(tokens);
    return `<${tag} style="${style}">${text}</${tag}>`;
  };

  renderer.paragraph = function ({ tokens }) {
    const style = cssPropertiesToString(theme.p);
    const text = this.parser.parseInline(tokens);
    return `<p style="${style}">${text}</p>`;
  };

  renderer.blockquote = function ({ tokens }) {
    const style = cssPropertiesToString(theme.blockquote);
    const text = this.parser.parse(tokens);
    // Replace inner <p> styles with blockquoteP styles
    const pStyle = cssPropertiesToString(theme.blockquoteP);
    const inner = text.replace(
      /<p style="[^"]*">/g,
      `<p style="${pStyle}">`
    );
    return `<blockquote style="${style}">${inner}</blockquote>`;
  };

  renderer.list = function ({ items, ordered }) {
    const tag = ordered ? 'ol' : 'ul';
    const style = cssPropertiesToString(ordered ? theme.ol : theme.ul);
    let body = '';
    for (const item of items) {
      body += this.listitem(item);
    }
    return `<${tag} style="${style}">${body}</${tag}>`;
  };

  renderer.listitem = function ({ tokens }) {
    const style = cssPropertiesToString(theme.li);
    const text = this.parser.parse(tokens);
    return `<li style="${style}">${text}</li>`;
  };

  renderer.table = function ({ header, rows }) {
    const style = cssPropertiesToString(theme.table);
    const theadStyle = cssPropertiesToString(theme.thead);

    let headerHtml = '';
    for (const cell of header) {
      headerHtml += this.tablecell(cell);
    }
    const headRow = this.tablerow({ text: headerHtml });

    let bodyHtml = '';
    for (const row of rows) {
      let rowHtml = '';
      for (const cell of row) {
        rowHtml += this.tablecell(cell);
      }
      bodyHtml += this.tablerow({ text: rowHtml });
    }

    return `<table style="${style}"><thead style="${theadStyle}">${headRow}</thead><tbody>${bodyHtml}</tbody></table>`;
  };

  renderer.tablerow = function ({ text }) {
    const style = cssPropertiesToString(theme.tr);
    return `<tr style="${style}">${text}</tr>`;
  };

  renderer.tablecell = function ({ tokens, header }) {
    const tag = header ? 'th' : 'td';
    const style = cssPropertiesToString(header ? theme.th : theme.td);
    const text = this.parser.parseInline(tokens);
    return `<${tag} style="${style}">${text}</${tag}>`;
  };

  renderer.hr = () => {
    const style = cssPropertiesToString(theme.hr);
    return `<hr style="${style}">`;
  };

  // Inline elements receive already-parsed text
  renderer.link = ({ href, text }) => {
    if (linkToFootnote) {
      if (href.startsWith('#') || href.includes('mp.weixin.qq.com')) {
        const style = cssPropertiesToString(theme.a);
        return `<a href="${href}" style="${style}">${text}</a>`;
      }
      linkCounter++;
      footnoteLinks.push({ href, text: String(text) });
      return `<span>${text}<sup style="color: #576b95; font-size: 12px; margin-left: 2px;">[${linkCounter}]</sup></span>`;
    }
    const style = cssPropertiesToString(theme.a);
    return `<a href="${href}" style="${style}">${text}</a>`;
  };

  renderer.image = ({ href, text }) => {
    const style = cssPropertiesToString(theme.img);
    return `<img src="${href}" alt="${text || ''}" style="${style}">`;
  };

  renderer.strong = ({ text }) => {
    const style = cssPropertiesToString(theme.strong);
    return `<strong style="${style}">${text}</strong>`;
  };

  renderer.em = ({ text }) => {
    const style = cssPropertiesToString(theme.em);
    return `<em style="${style}">${text}</em>`;
  };

  renderer.del = ({ text }) => {
    const style = cssPropertiesToString(theme.del);
    return `<del style="${style}">${text}</del>`;
  };

  renderer.codespan = ({ text }) => {
    const style = cssPropertiesToString(theme.codeInline);
    return `<code style="${style}">${text}</code>`;
  };

  renderer.code = ({ text, lang }) => {
    if (lang === 'mermaid') {
      return `<div class="mermaid-placeholder" data-chart="${btoa(encodeURIComponent(text))}" style="text-align: center; padding: 16px; background: #f5f5f5; border-radius: 6px; margin-bottom: 16px; color: #999;">Mermaid 图表加载中...</div>`;
    }

    const preStyle = cssPropertiesToString(theme.pre);
    const codeStyle = cssPropertiesToString(theme.codeBlock);

    let highlighted: string;
    if (lang && hljs.getLanguage(lang)) {
      highlighted = hljs.highlight(text, { language: lang }).value;
    } else {
      highlighted = hljs.highlightAuto(text).value;
    }

    // Convert hljs class-based spans to inline styles
    const inlined = hljsClassToStyle(highlighted);

    return `<pre style="${preStyle}"><code style="${codeStyle}">${inlined}</code></pre>`;
  };

  return renderer;
}
