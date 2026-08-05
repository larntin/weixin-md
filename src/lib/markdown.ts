import { marked } from 'marked';
import { createWechatRenderer, getFootnoteLinksHtml, resetFootnoteLinks } from './renderer';
import { buildTheme } from './theme';
import {
  katexInlineExtension,
  katexBlockExtension,
  footnoteRefExtension,
  footnoteDefExtension,
  rubyTextExtension,
  getFootnotesHtml,
  resetFootnotes,
} from './extensions';

// Register extensions once
marked.use({
  extensions: [
    katexBlockExtension,
    katexInlineExtension,
    footnoteDefExtension,
    footnoteRefExtension,
    rubyTextExtension,
  ],
});

export function renderMarkdown(
  markdown: string,
  themeId: string = 'default',
  paletteId: string = 'blue',
  linkToFootnote: boolean = true
): string {
  // Reset state
  resetFootnoteLinks();
  resetFootnotes();

  const theme = buildTheme(themeId, paletteId);
  const renderer = createWechatRenderer(theme, linkToFootnote);
  marked.setOptions({ renderer, breaks: true, gfm: true });

  let html = marked.parse(markdown) as string;

  // marked 的 inline extension 会在自定义 token 前误插入 <br>，清理注脚前的换行
  html = html.replace(/<br>\s*<sup data-footnote-ref/g, '<sup data-footnote-ref');

  // Append footnotes section
  const footnotesHtml = getFootnotesHtml();
  if (footnotesHtml) html += footnotesHtml;

  // Append link references section
  const linksHtml = getFootnoteLinksHtml();
  if (linksHtml) html += linksHtml;

  return html;
}
