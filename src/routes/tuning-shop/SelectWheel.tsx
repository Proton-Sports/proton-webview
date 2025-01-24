import { useMemo } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Button from '../../lib/components/Button';
import { useCategoryValues } from './context';
import type { OwnedWheelVariation, WheelVariation } from './Index';
import { wheelTypeNames } from './utils';

interface Props {
  id: number;
  wheelVariations: WheelVariation[];
  wheelType: number;
  ownedWheelVariations?: OwnedWheelVariation[];
  onWheelTypeChange: (value: number) => void;
  onBuy: (wheelVariation: WheelVariation) => void;
  onToggle: (wheelVariation: WheelVariation, value: boolean) => void;
}

export default function Select({
  id,
  wheelVariations: initialWheelVariations,
  ownedWheelVariations,
  wheelType,
  onBuy,
  onToggle,
  onWheelTypeChange,
}: Props) {
  const { categories, setCategories } = useCategoryValues();
  const category = useMemo(() => categories[id] ?? {}, [categories, id]);
  const wheels = useMemo(() => initialWheelVariations ?? [], [initialWheelVariations]);
  const categorizedWheels = useMemo(() => Object.groupBy(wheels, (a) => a.type), [wheels]);
  const index = (category.index as number) ?? -1;
  const activeWheel = useMemo(
    () => (index === -1 ? undefined : categorizedWheels[wheelType]?.[index]),
    [categorizedWheels, wheelType, index]
  );
  const activeOwnedWheel = useMemo(
    () => (activeWheel ? ownedWheelVariations?.find((a) => a.wheelVariationId === activeWheel.id) : undefined),
    [ownedWheelVariations, activeWheel]
  );
  const wheelTypes = useMemo(
    () =>
      Object.keys(categorizedWheels)
        .map((a) => Number(a))
        .toSorted((a, b) => a - b),
    [categorizedWheels]
  );
  const wheelTypeIndex = useMemo(() => wheelTypes.indexOf(wheelType), [wheelTypes, wheelType]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={wheelTypeIndex <= -1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (wheelTypeIndex <= -1) {
              return;
            }
            onWheelTypeChange(wheelTypes[wheelTypeIndex - 1]);
          }}
        >
          <BiChevronLeft />
        </button>
        <div>
          <p className="font-medium text-center">
            {wheelTypeNames[wheelTypes[wheelTypeIndex] as keyof typeof wheelTypeNames] ?? 'Vanilla (no wheel type)'}
          </p>
        </div>
        <button
          type="button"
          disabled={wheelTypeIndex >= wheelTypes.length - 1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (wheelTypeIndex >= wheelTypes.length - 1) {
              return;
            }
            onWheelTypeChange(wheelTypes[wheelTypeIndex + 1]);
          }}
        >
          <BiChevronRight />
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          type="button"
          disabled={index <= -1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (index <= -1) {
              return;
            }
            setCategories((a) => {
              alt.emit('tuning-shop.wheels.change', wheelType, index - 1);
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
          {activeWheel ? (
            <p className="font-medium text-center">{activeWheel.name}</p>
          ) : (
            <p className="font-medium text-center text-sm text-fg-3">Vanilla (no mod)</p>
          )}
        </div>
        <button
          type="button"
          disabled={wheelTypeIndex === -1 || index >= wheels.length - 1}
          className="disabled:text-fg-disabled"
          onClick={() => {
            if (index >= wheels.length - 1) {
              return;
            }
            setCategories((a) => {
              alt.emit('tuning-shop.wheels.change', wheelType, index + 1);
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
      {activeWheel &&
        (ownedWheelVariations == null || activeOwnedWheel == null ? (
          <Button
            type="button"
            variant="base"
            className="text-sm font-medium mx-auto"
            onClick={() => {
              onBuy(activeWheel);
            }}
          >
            Buy for {activeWheel?.price ?? 0}PT
          </Button>
        ) : (
          <Button
            type="button"
            variant="base"
            className="text-sm font-medium mx-auto"
            onClick={() => {
              onToggle(activeWheel, !activeOwnedWheel.isActive);
            }}
          >
            {activeOwnedWheel.isActive ? 'Detach' : 'Attach'}
          </Button>
        ))}
      <p className="text-xs text-fg-3 text-center">
        {wheelTypeIndex !== -1 &&
          (activeWheel == null
            ? `There are ${categorizedWheels[wheelType]?.length ?? 0} items in total.`
            : `${index + 1}/${categorizedWheels[wheelType]?.length ?? 0}`)}
      </p>
    </div>
  );
}
