import { useRef, useEffect } from 'react';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}

const lightTheme = EditorView.theme({
  '&': { height: '100%', fontSize: '14px', backgroundColor: '#ffffff' },
  '.cm-scroller': { overflow: 'auto', fontFamily: "Menlo, Monaco, Consolas, monospace" },
  '.cm-content': { padding: '16px', color: '#1a1a1a' },
  '.cm-gutters': { display: 'none' },
  '.cm-cursor': { borderLeftColor: '#333' },
  '.cm-activeLine': { backgroundColor: '#f5f5f5' },
});

const darkThemeCustom = EditorView.theme({
  '&': { height: '100%', fontSize: '14px' },
  '.cm-scroller': { overflow: 'auto', fontFamily: "Menlo, Monaco, Consolas, monospace" },
  '.cm-content': { padding: '16px' },
  '.cm-gutters': { display: 'none' },
});

export function MarkdownEditor({ value, onChange, dark = true }: MarkdownEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(undefined);
  const themeCompRef = useRef(new Compartment());
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;
    const themeComp = themeCompRef.current;

    const getThemeExt = (isDark: boolean) =>
      isDark
        ? [oneDark, darkThemeCustom]
        : [syntaxHighlighting(defaultHighlightStyle), lightTheme];

    const state = EditorState.create({
      doc: value,
      extensions: [
        history({}),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({ codeLanguages: languages }),
        themeComp.of(getThemeExt(dark)),
        placeholder('在此输入 Markdown...'),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch theme when dark prop changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const themeComp = themeCompRef.current;

    const getThemeExt = (isDark: boolean) =>
      isDark
        ? [oneDark, darkThemeCustom]
        : [syntaxHighlighting(defaultHighlightStyle), lightTheme];

    view.dispatch({
      effects: themeComp.reconfigure(getThemeExt(dark)),
    });
  }, [dark]);

  // Sync external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={containerRef} className="flex-1 min-h-0" />;
}
