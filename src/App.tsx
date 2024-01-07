import { Suspense } from 'react';
import { useRouter } from './lib/contexts/router-context';

export default function App() {
  const { route } = useRouter();

  // const { mountRoute, unmountRoute } = useRouter();
  // useEffect(() => {
  //   mountRoute('example-route');

  //   const t1 = setTimeout(() => {
  //     unmountRoute('example-route');
  //   }, 1000);

  //   const t2 = setTimeout(() => {
  //     mountRoute('example-route');
  //   }, 2000);

  //   return () => {
  //     unmountRoute('example-route');
  //     clearTimeout(t1);
  //     clearTimeout(t2);
  //   };
  // }, []);

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
