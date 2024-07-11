import { Suspense, useEffect } from 'react';
import { useRouter } from './lib/contexts/router-context';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const { route } = useRouter();

  useEffect(() => {
    alt.emit('webview:ready');
  }, []);

  return (
    <AnimatePresence initial={true}>
      {alt.isBrowser && <div className="fixed inset-0 bg-black"></div>}
      {Object.entries(route).map(([key, Component]) => (
        <Suspense key={key}>
          <div className="fixed inset-0">
            <Component />
          </div>
        </Suspense>
      ))}
    </AnimatePresence>
  );
}
