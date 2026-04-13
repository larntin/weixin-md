/**
 * Copy HTML string to clipboard as rich text (text/html).
 * Falls back to execCommand for browsers without Clipboard API support.
 */
export async function copyHtmlToClipboard(html: string): Promise<void> {
  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    const blob = new Blob([html], { type: 'text/html' });
    const item = new ClipboardItem({ 'text/html': blob });
    await navigator.clipboard.write([item]);
    return;
  }

  // Fallback: create a hidden contenteditable element, paste HTML into it, select and copy
  const container = document.createElement('div');
  container.setAttribute('contenteditable', 'true');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.opacity = '0';
  document.body.appendChild(container);

  const range = document.createRange();
  range.selectNodeContents(container);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  document.execCommand('copy');

  selection?.removeAllRanges();
  document.body.removeChild(container);
}

export function prepareHtmlForCopy(html: string): string {
  // Replace mermaid placeholders
  html = html.replace(
    /<div class="mermaid-placeholder"[^>]*>[\s\S]*?<\/div>/g,
    '<p style="color: #999; background: #f5f5f5; padding: 12px; text-align: center; border-radius: 4px; margin-bottom: 16px;">【请插入图片：Mermaid 图表】</p>'
  );
  // Replace katex block placeholders
  html = html.replace(
    /<div class="katex-block"[^>]*>[\s\S]*?<\/div>/g,
    '<p style="color: #999; background: #f5f5f5; padding: 12px; text-align: center; border-radius: 4px; margin-bottom: 16px;">【请插入图片：数学公式】</p>'
  );
  return html;
}
