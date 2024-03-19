import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Arrow from '../../lib/assets/images/arrow_button.png';
import RightBackground from '../../lib/assets/images/race-main-menu-bg.webp';
import LeftBackground from '../../lib/assets/images/racing_menu_list_bg.png';
import Button from '../../lib/components/Button';
import Host from './Host';
import Races from './Races';
import Creator from './Creator';

type Page = (typeof pages)[number]['id'];

const pages = [
  { id: 'races', label: 'Races', node: <Races /> },
  { id: 'host', label: 'Host', node: <Host /> },
  { id: 'creator-mode', label: 'Creator', node: <Creator /> },
  { id: 'settings', label: 'Settings', node: <div></div> },
  { id: 'credits', label: 'Credits', node: <div></div> },
] as const;

export default function Index() {
  const [activePage, setActivePage] = useState<Page | null>(null);

  useEffect(() => {
    function handleNavigate(page: Page | null) {
      setActivePage(page);
    }

    alt.on('race-menu-list:navigate', handleNavigate);

    return () => {
      alt.off('race-menu-list:navigate', handleNavigate);
    };
  }, []);

  function handleChangePage(page: Page) {
    setActivePage((activePage) => (activePage === page ? null : page));
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: { translateX: '0%' },
        hidden: { translateX: '-100%' },
      }}
      transition={{ duration: 0.4, ease: 'circInOut' }}
      className="fixed inset-0"
    >
      <motion.div
        className="fixed inset-0"
        animate={activePage ? 'visible' : 'hidden'}
        variants={{
          visible: { translateX: '0%' },
          hidden: { translateX: '-100%' },
        }}
        initial="hidden"
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <img src={RightBackground} className="absolute object-cover w-full h-full blur-sm" />
        <div className="absolute inset-0 bg-bg-1/60" />
        <AnimatePresence>
          {activePage && (
            <motion.div
              key={activePage}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pages.find((x) => x.id === activePage)?.node}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <img src={LeftBackground} className="fixed h-full" />
      <ol className="fixed space-y-4 -translate-y-1/2 left-4 top-1/2">
        {pages.map(({ id, label }, index) => {
          const active = activePage === id;
          return (
            <li key={id} className="w-full" style={{ marginLeft: `${index * 0.6}rem` }}>
              <Button
                transparent={!active}
                variant={active ? 'primary' : 'base'}
                className={clsx(
                  'flex items-center w-full text-left uppercase duration-100 group fugaz max-w-40 transition',
                  active && 'translate-x-8'
                )}
                onClick={() => handleChangePage(id)}
              >
                {label}
                <img
                  src={Arrow}
                  className={clsx(
                    'transition-opacity ml-auto w-4',
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  )}
                />
              </Button>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}
