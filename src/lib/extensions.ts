import katex from 'katex';
import type { TokenizerAndRendererExtension } from 'marked';

// ---------------------------------------------------------------------------
// 1. KaTeX Math Extensions
// ---------------------------------------------------------------------------

export const katexInlineExtension: TokenizerAndRendererExtension = {
  name: 'inlineMath',
  level: 'inline',
  start(src: string) {
    return src.indexOf('$');
  },
  tokenizer(src: string) {
    const match = src.match(/^\$([^\s$](?:[^$]*[^\s$])?)\$/);
    if (match) {
      return {
        type: 'inlineMath',
        raw: match[0],
        text: match[1],
      };
    }
  },
  renderer(token) {
    const html = katex.renderToString(token.text as string, {
      displayMode: false,
      throwOnError: false,
    });
    return `<span>${html}</span>`;
  },
};

export const katexBlockExtension: TokenizerAndRendererExtension = {
  name: 'blockMath',
  level: 'block',
  start(src: string) {
    return src.indexOf('$$\n');
  },
  tokenizer(src: string) {
    const match = src.match(/^\$\$\n([\s\S]+?)\n\$\$/);
    if (match) {
      return {
        type: 'blockMath',
        raw: match[0],
        text: match[1],
      };
    }
  },
  renderer(token) {
    const text = token.text as string;
    const encoded = btoa(unescape(encodeURIComponent(text)));
    const html = katex.renderToString(text, {
      displayMode: true,
      throwOnError: false,
    });
    return `<div class="katex-block" data-katex="${encoded}" style="background: #fafafa; padding: 16px; border-radius: 6px; margin-bottom: 16px; text-align: center; overflow-x: auto;">${html}</div>`;
  },
};

// ---------------------------------------------------------------------------
// 2. Footnote Extensions
// ---------------------------------------------------------------------------

const footnoteMap = new Map<string, { index: number; content: string }>();
let footnoteCounter = 0;

export function resetFootnotes(): void {
  footnoteMap.clear();
  footnoteCounter = 0;
}

export function getFootnotesHtml(): string {
  if (footnoteMap.size === 0) return '';

  const items = Array.from(footnoteMap.values())
    .sort((a, b) => a.index - b.index)
    .map(
      (fn) =>
        `<li style="margin: 4px 0; font-size: 12px; color: #666; list-style-type: decimal;">${fn.content}</li>`
    )
    .join('\n');

  return `<section style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #eee;">
<h4 style="font-size: 14px; color: #333; margin-bottom: 8px;">注释</h4>
<ol style="padding-left: 16px; margin: 0;">
${items}
</ol>
</section>`;
}

export const footnoteRefExtension: TokenizerAndRendererExtension = {
  name: 'footnoteRef',
  level: 'inline',
  start(src: string) {
    return src.indexOf('[^');
  },
  tokenizer(src: string) {
    const match = src.match(/^\[\^([^\]]+)\]/);
    if (match) {
      return {
        type: 'footnoteRef',
        raw: match[0],
        label: match[1],
      };
    }
  },
  renderer(token) {
    const label = token.label as string;
    const entry = footnoteMap.get(label);
    const index = entry ? entry.index : footnoteCounter + 1;
    if (!entry) {
      footnoteCounter++;
      footnoteMap.set(label, { index: footnoteCounter, content: '' });
    }
    return `<sup style="color: #576b95; font-size: 12px;">[${index}]</sup>`;
  },
};

export const footnoteDefExtension: TokenizerAndRendererExtension = {
  name: 'footnoteDef',
  level: 'block',
  start(src: string) {
    return src.indexOf('[^');
  },
  tokenizer(src: string) {
    const match = src.match(/^\[\^([^\]]+)\]:\s+(.*?)(?:\n|$)/);
    if (match) {
      return {
        type: 'footnoteDef',
        raw: match[0],
        label: match[1],
        content: match[2],
      };
    }
  },
  renderer(token) {
    const label = token.label as string;
    const content = token.content as string;
    const existing = footnoteMap.get(label);
    if (existing) {
      existing.content = content;
    } else {
      footnoteCounter++;
      footnoteMap.set(label, { index: footnoteCounter, content });
    }
    return '';
  },
};

// ---------------------------------------------------------------------------
// 3. Ruby Text Extension
// ---------------------------------------------------------------------------

export const rubyTextExtension: TokenizerAndRendererExtension = {
  name: 'rubyText',
  level: 'inline',
  start(src: string) {
    return src.indexOf('{');
  },
  tokenizer(src: string) {
    const match = src.match(/^\{([^}]+)\}\(([^)]+)\)/);
    if (match) {
      return {
        type: 'rubyText',
        raw: match[0],
        content: match[1],
        annotation: match[2],
      };
    }
  },
  renderer(token) {
    const content = token.content as string;
    const annotation = token.annotation as string;
    return `<ruby style="ruby-position: over;">${content}<rp>(</rp><rt style="font-size: 12px; color: #999;">${annotation}</rt><rp>)</rp></ruby>`;
  },
};
