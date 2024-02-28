import { Suspense, useEffect } from 'react';
import { useRouter } from './lib/contexts/router-context';

export default function App() {
  const { route, mountRoute } = useRouter();

  useEffect(() => {
    // mountRoute('racing_menu_list');
  }, []);

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
