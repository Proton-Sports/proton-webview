import { Accordion } from '@ark-ui/react/accordion';
import { lazy, Suspense, useRef, useState, type MouseEventHandler } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { Virtualizer } from 'virtua';
import CategoryValuesProvider from './CategoryValuesProvider';

interface Props {
  mods: Mod[];
}

interface Mod {
  id: number;
  name: string;
  category: number;
  model: number;
  value: number;
  price: number;
}

export default function Index({ mods }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [categorizedMods] = useState<Partial<Record<number, Mod[]>>>(
    mods ? Object.groupBy(mods, (a) => a.category) : {}
  );
  const handleCamera: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-y-16 left-16 bg-bg-1/80 overflow-hidden grid grid-rows-[auto_1fr] rounded-lg min-w-96">
      <div className="p-4">
        <h2 className="text-xl font-black tracking-tight leading-none">PROTech AUTOPARTS</h2>
      </div>
      <CategoryValuesProvider>
        <div ref={scrollRef} className="overflow-auto p-4 pt-0" style={{ overflowAnchor: 'none' }}>
          <Accordion.Root multiple>
            <Accordion.Context>
              {(context) => (
                <Virtualizer scrollRef={scrollRef}>
                  {categories.map((item) => {
                    const Content = item.component as unknown as React.LazyExoticComponent<
                      (props: Record<string, unknown>) => JSX.Element
                    >;
                    return (
                      <Accordion.Item
                        key={item.id}
                        value={item.id + ''}
                        className="group border border-transparent data-[state=open]:border-bg-border rounded data-[state=open]:bg-bg-2/60"
                      >
                        <Accordion.ItemTrigger className="flex font-medium justify-between w-full rounded p-4 hover:bg-bg-2/60 text-fg-3 group-data-[state=open]:font-bold group-data-[state=open]:text-fg-1 tracking-tight">
                          {item.name}
                          <div className="flex gap-4">
                            <button
                              type="button"
                              disabled={!context.value.includes(item.id + '')}
                              onClick={handleCamera}
                              className="[&:not(:disabled)]:hover:text-fg-hover"
                            >
                              <BsEye />
                            </button>
                            <Accordion.ItemIndicator className="transition-transform ease-in-out data-[state=open]:-rotate-180">
                              <BiChevronDown />
                            </Accordion.ItemIndicator>
                          </div>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <div className="p-4">
                            <Suspense fallback="Loading...">
                              <Content {...item.props} items={categorizedMods[item.id]} />
                            </Suspense>
                          </div>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    );
                  })}
                </Virtualizer>
              )}
            </Accordion.Context>
          </Accordion.Root>
        </div>
      </CategoryValuesProvider>
    </div>
  );
}

const categories = [
  colorCategory(66, 'Primary Color'),
  colorCategory(67, 'Secondary Color'),
  category(0, 'Spoilers', { name: 'spoilers' }),
  category(1, 'Front Bumper', { name: 'front-bumper' }),
  category(2, 'Rear Bumper', { name: 'rear-bumper' }),
  category(3, 'Side Skirt', { name: 'side-skirt' }),
  category(4, 'Exhaust', { name: 'exhaust' }),
  category(5, 'Frame', { name: 'frame' }),
  category(6, 'Grille', { name: 'grille' }),
  category(7, 'Bonnet', { name: 'bonnet' }),
  category(8, 'Left Wing', { name: 'left-wing' }),
  category(9, 'Right Wing', { name: 'right-wing' }),
  category(10, 'Roof', { name: 'roof' }),
  category(11, 'Engine', { name: 'engine' }),
  category(12, 'Brakes', { name: 'brakes' }),
  category(13, 'Transmission', { name: 'transmission' }),
  category(14, 'Horns', { name: 'horns' }),
  category(15, 'Suspension', { name: 'suspension' }),
  category(16, 'Armor', { name: 'armor' }),
  category(18, 'Turbo', { name: 'turbo' }),
  category(20, 'Custom Tire Smoke', { name: 'custom-tire-smoke' }),
  category(22, 'Xenon', { name: 'xenon' }),
  category(23, 'Front Wheels', { name: 'front-wheels' }),
  category(24, 'Back Wheels', { name: 'back-wheels' }),
  category(25, 'Plate Holders', { name: 'plate-holders' }),
  category(26, 'Plate Vanity', { name: 'plate-vanity' }),
  category(27, 'Trim Design', { name: 'trim-design' }),
  category(28, 'Ornaments', { name: 'ornaments' }),
  category(30, 'Dial Design', { name: 'dial-design' }),
  category(31, 'Door Interior', { name: 'door-interior' }),
  category(32, 'Seats', { name: 'seats' }),
  category(33, 'Steering Wheel', { name: 'steering-wheel' }),
  category(34, 'Shift Lever', { name: 'shift-lever' }),
  category(35, 'Plaques', { name: 'plaques' }),
  category(36, 'Rear Shelf', { name: 'rear-shelf' }),
  category(37, 'Trunk', { name: 'trunk' }),
  category(38, 'Hydraulics', { name: 'hydraulics' }),
  category(39, 'Engine Block', { name: 'engine-block' }),
  category(40, 'Air Filter', { name: 'air-filter' }),
  category(41, 'Strut Bar', { name: 'strut-bar' }),
  category(42, 'Arch Cover', { name: 'arch-cover' }),
  category(43, 'Antenna', { name: 'antenna' }),
  category(44, 'Exterior Parts', { name: 'exterior-parts' }),
  category(45, 'Tank', { name: 'tank' }),
  category(46, 'Door', { name: 'door' }),
  category(47, 'Wheels Rear Or Hydraulics', { name: 'wheels-rear-or-hydraulics' }),
  category(48, 'Livery', { name: 'livery' }),
];

function colorCategory(id: number, name: string, props?: Record<string, unknown>) {
  return {
    id,
    name,
    props: {
      id,
      ...props,
    },
    component: lazy(() => import('./SelectColor.tsx')),
  };
}

function category(id: number, name: string, props: Record<string, unknown>) {
  return {
    id,
    name,
    props: {
      id,
      ...props,
    },
    component: lazy(() => import('./Select.tsx')),
  };
}
