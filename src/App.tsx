import { Suspense, useEffect } from 'react';
import { useRouter } from './lib/contexts/router-context';

export default function App() {
  const { route } = useRouter();
  const { mountRoute, unmountRoute } = useRouter();

  useEffect(() => {
    mountRoute('auth');
  }, [])

  return (
    <>
      {Object.entries(route).map(([key, Component]) => (
        <Suspense key={key}>
          <div className="fixed inset-0">
            <Component />
          </div>
        </Suspense>
      ))}
    </>
  );
}
