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
      {alt.isBrowser && <div className="fixed inset-0 bg-green-500"></div>}
      {Object.entries(route).map(([key, { Component, props }]) => (
        <Suspense key={key}>
          <div className="fixed inset-0">
            <Component {...props} />
          </div>
        </Suspense>
      ))}
    </AnimatePresence>
  );
}
