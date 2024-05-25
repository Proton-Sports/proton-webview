import { Suspense, useEffect } from 'react';
import { useRouter } from './lib/contexts/router-context';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const { route, mountRoute } = useRouter();

  useEffect(() => {
    alt.emit('webview:ready');
    mountRoute('speedometer');
  }, []);

  return (
    <AnimatePresence initial={true}>
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
