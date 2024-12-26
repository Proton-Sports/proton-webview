import { useMemo } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import Color from './Color';
import { useCategoryValues } from './context';

interface Props {
  id: number;
  name: string;
}

export default function SelectColor({ id, name }: Props) {
  const { categories, setCategories } = useCategoryValues();
  const category = useMemo(() => categories[id], [categories, id]);
  const color = (category?.color as string) ?? '#ffffff';
  const handleChange = (color: string) => {
    setCategories((a) => ({
      ...a,
      [id]: {
        ...a[id],
        color,
      },
    }));
    alt.emit('tuning-shop.colors.change', name, color);
  };

  return (
    <div className="flex gap-2">
      <div className="colorful-picker flex-1 min-h-40">
        <HexColorPicker color={color} onChange={handleChange} />
      </div>
      <div className="flex-1 grid grid-rows-[1fr_auto] items-start gap-2 -mr-2 pr-2">
        <div className="flex flex-wrap *:basis-6 justify-center">
          {colors.map((a) => (
            <Color key={a} color={a} onClick={handleChange} />
          ))}
        </div>
        <HexColorInput prefixed alpha color={color} onChange={handleChange} className="c-input" />
      </div>
    </div>
  );
}

const colors = [
  '#ffffff',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#64748b',
  '#6b7280',
  '#71717a',
  '#737373',
  '#78716c',
  '#000000',
];
