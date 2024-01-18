import { Suspense } from 'react';
import { useRouter } from './lib/contexts/router-context';

export default function App() {
  const { route} = useRouter();
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
