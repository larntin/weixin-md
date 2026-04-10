import { marked } from 'marked';
import { createWechatRenderer } from './renderer';
import type { ThemeStyles } from './theme';
import { defaultTheme } from './theme';

export function renderMarkdown(
  markdown: string,
  theme: ThemeStyles = defaultTheme
): string {
  const renderer = createWechatRenderer(theme);
  marked.setOptions({ renderer, breaks: true, gfm: true });
  return marked.parse(markdown) as string;
}
