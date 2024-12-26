import { useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useCategoryValues } from './context';

interface Props {
  id: number;
  name: string;
  items: { id: number; name: string; price: number }[];
  defaultId?: number;
}

export default function Select({ id, name, items: propItems, defaultId }: Props) {
  const { categories, setCategories } = useCategoryValues();
  const category = useMemo(() => categories[id] ?? {}, [categories, id]);
  const items = useMemo(() => propItems ?? [], [propItems]);
  const index = useMemo(
    () => (category.index as number) ?? items.findIndex((a) => a.id === defaultId),
    [category.index, items, defaultId]
  );
  const activeItem = useMemo(() => (index === -1 ? undefined : items[index]), [items, index]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={index <= -1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (index <= -1) {
              return;
            }
            setCategories((a) => {
              alt.emit('tuning-shop.values.change', name, index - 1);
              return {
                ...a,
                [id]: {
                  ...a[id],
                  index: index - 1,
                },
              };
            });
          }}
        >
          <BiChevronLeft />
        </button>
        <div>
          {activeItem ? (
            <p className="font-medium text-center">
              {activeItem.name} <span className="text-fg-3">({activeItem?.price ?? 0}$)</span>
            </p>
          ) : (
            <p className="font-medium text-center text-sm text-fg-3">Vanilla (no mod)</p>
          )}
        </div>
        <button
          type="button"
          disabled={index >= items.length - 1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (index >= items.length - 1) {
              return;
            }
            setCategories((a) => {
              alt.emit('tuning-shop.values.change', name, index + 1);
              return {
                ...a,
                [id]: {
                  ...a[id],
                  index: index + 1,
                },
              };
            });
          }}
        >
          <BiChevronRight />
        </button>
      </div>
      <p className="text-xs text-fg-3 text-center mt-4">
        {activeItem == null ? `There are ${items.length ?? 0} items in total.` : `${index + 1}/${items.length}`}
      </p>
    </div>
  );
}
