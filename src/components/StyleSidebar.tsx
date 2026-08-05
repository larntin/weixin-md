export type StylePreset = {
  id: string;
  name: string;
  enName: string;
  accent: string;
  image?: string;
};

type Props = {
  presets: StylePreset[];
  selectedId: string;
  onSelect: (id: string) => void;
  dark: boolean;
  variant?: 'vertical' | 'horizontal';
  className?: string;
};

function StyleCard({
  preset,
  selected,
  dark,
  onClick,
  horizontal,
}: {
  preset: StylePreset;
  selected: boolean;
  dark: boolean;
  onClick: () => void;
  horizontal: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col text-left cursor-pointer rounded-lg overflow-hidden border transition-colors ${
        horizontal ? 'w-[88px] shrink-0' : ''
      } ${
        selected
          ? 'border-2'
          : dark
          ? 'border-gray-700 hover:border-gray-500'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      style={selected ? { borderColor: preset.accent } : undefined}
    >
      <div
        className={horizontal ? 'h-12 w-full' : 'h-[72px] w-full'}
        style={
          preset.image
            ? undefined
            : {
                background: `linear-gradient(135deg, ${preset.accent}22, ${preset.accent}44)`,
              }
        }
      >
        {preset.image && (
          <img src={preset.image} alt={preset.name} className="h-full w-full object-cover" />
        )}
      </div>

      <div className={`text-center ${dark ? 'bg-[#282c34]' : 'bg-white'}`}>
        <div
          className={`px-2 ${horizontal ? 'py-[3px] text-[11px]' : 'py-2 text-sm'} font-semibold ${
            dark ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          {preset.name}
        </div>
      </div>
    </button>
  );
}

export function StyleSidebar({
  presets,
  selectedId,
  onSelect,
  dark,
  variant = 'vertical',
  className = '',
}: Props) {
  if (variant === 'horizontal') {
    return (
      <aside
        className={`shrink-0 border-b ${
          dark ? 'bg-[#21252b] border-gray-700' : 'bg-gray-50 border-gray-200'
        } ${className}`}
      >
        <div className="flex items-center gap-3 px-3 py-2 overflow-x-auto">
          <span
            className={`shrink-0 text-xs font-medium ${
              dark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            样式
          </span>
          {presets.map((preset) => (
            <StyleCard
              key={preset.id}
              preset={preset}
              selected={preset.id === selectedId}
              dark={dark}
              horizontal
              onClick={() => onSelect(preset.id)}
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`flex flex-col w-[150px] shrink-0 h-full overflow-y-auto border-r ${
        dark ? 'bg-[#21252b] border-gray-700' : 'bg-gray-50 border-gray-200'
      } ${className}`}
    >
      <div
        className={`px-3 py-2 text-xs font-medium shrink-0 border-b sticky top-0 z-10 ${
          dark
            ? 'text-gray-400 border-gray-700 bg-[#21252b]'
            : 'text-gray-500 bg-gray-100 border-gray-200'
        }`}
      >
        样式
      </div>

      <div className="flex flex-col gap-3 p-3">
        {presets.map((preset) => (
          <StyleCard
            key={preset.id}
            preset={preset}
            selected={preset.id === selectedId}
            dark={dark}
            horizontal={false}
            onClick={() => onSelect(preset.id)}
          />
        ))}
      </div>
    </aside>
  );
}
