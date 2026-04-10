// Maps highlight.js CSS classes to inline color styles (One Dark theme)
const hljsColorMap: Record<string, string> = {
  'hljs-keyword': 'color: #c678dd',
  'hljs-built_in': 'color: #e6c07b',
  'hljs-type': 'color: #e6c07b',
  'hljs-literal': 'color: #56b6c2',
  'hljs-number': 'color: #d19a66',
  'hljs-string': 'color: #98c379',
  'hljs-template-variable': 'color: #98c379',
  'hljs-regexp': 'color: #98c379',
  'hljs-addition': 'color: #98c379',
  'hljs-symbol': 'color: #61aeee',
  'hljs-variable': 'color: #e06c75',
  'hljs-template-tag': 'color: #e06c75',
  'hljs-deletion': 'color: #e06c75',
  'hljs-selector-class': 'color: #e6c07b',
  'hljs-selector-attr': 'color: #e6c07b',
  'hljs-selector-pseudo': 'color: #e6c07b',
  'hljs-selector-id': 'color: #61aeee',
  'hljs-selector-tag': 'color: #e06c75',
  'hljs-attr': 'color: #d19a66',
  'hljs-attribute': 'color: #98c379',
  'hljs-params': 'color: #abb2bf',
  'hljs-comment': 'color: #5c6370; font-style: italic',
  'hljs-doctag': 'color: #c678dd',
  'hljs-meta': 'color: #61aeee',
  'hljs-meta-keyword': 'color: #61aeee',
  'hljs-meta-string': 'color: #98c379',
  'hljs-section': 'color: #e06c75',
  'hljs-tag': 'color: #e06c75',
  'hljs-name': 'color: #e06c75',
  'hljs-title': 'color: #61aeee',
  'hljs-title.class_': 'color: #e6c07b',
  'hljs-title.function_': 'color: #61aeee',
  'hljs-subst': 'color: #e06c75',
  'hljs-function': 'color: #61aeee',
  'hljs-formula': 'color: #98c379',
  'hljs-link': 'color: #61aeee; text-decoration: underline',
  'hljs-quote': 'color: #98c379; font-style: italic',
  'hljs-emphasis': 'font-style: italic',
  'hljs-strong': 'font-weight: bold',
  'hljs-bullet': 'color: #61aeee',
  'hljs-property': 'color: #e06c75',
};

/**
 * Convert highlight.js class-based HTML spans to inline style spans.
 * e.g. <span class="hljs-keyword">const</span>
 *   -> <span style="color: #c678dd">const</span>
 */
export function hljsClassToStyle(html: string): string {
  return html.replace(
    /<span class="([^"]+)">/g,
    (_match, classes: string) => {
      const classList = classes.split(/\s+/);
      const styles: string[] = [];
      for (const cls of classList) {
        if (hljsColorMap[cls]) {
          styles.push(hljsColorMap[cls]);
        }
      }
      if (styles.length > 0) {
        return `<span style="${styles.join('; ')}">`;
      }
      return `<span>`;
    }
  );
}
