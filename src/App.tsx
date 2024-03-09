import { Suspense, useEffect } from 'react';
import { useRouter } from './lib/contexts/router-context';

export default function App() {
  const { route } = useRouter();
  //const { mountRoute, unmountRoute } = useRouter();

  // changed, when player opens menu it should first open racing_menu_list (The list in left side), then the category, race etc.


   //useEffect(() => {
      //mountRoute('car_shop');
   //}, [])

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
