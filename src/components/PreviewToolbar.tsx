type Props = {
  linkToFootnote: boolean;
  onLinkToFootnoteChange: (v: boolean) => void;
  onCopy: () => void;
  copyStatus: 'idle' | 'success' | 'error';
  disabled: boolean;
  dark: boolean;
};

export function PreviewToolbar({
  linkToFootnote,
  onLinkToFootnoteChange,
  onCopy,
  copyStatus,
  disabled,
  dark,
}: Props) {
  const copyButtonText =
    copyStatus === 'success'
      ? '已复制!'
      : copyStatus === 'error'
      ? '复制失败'
      : '复制到公众号';

  return (
    <div className="flex items-center gap-3">
      <label
        className={`flex items-center gap-1.5 text-xs cursor-pointer select-none ${
          dark ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        <input
          type="checkbox"
          checked={linkToFootnote}
          onChange={(e) => onLinkToFootnoteChange(e.target.checked)}
          className="cursor-pointer"
        />
        外链转引用
      </label>

      <button
        onClick={onCopy}
        disabled={disabled}
        className={`h-6 px-3 rounded text-xs font-medium transition-colors cursor-pointer ${
          copyStatus === 'success'
            ? 'bg-green-500 text-white'
            : copyStatus === 'error'
            ? 'bg-red-500 text-white'
            : !disabled
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : dark
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {copyButtonText}
      </button>
    </div>
  );
}
