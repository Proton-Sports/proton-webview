import { ReactNode, createContext, lazy, useCallback, useContext, useEffect, useState } from 'react';

type RouteRecord = Record<string, React.LazyExoticComponent<React.ComponentType<any>>>;
type RouterContextValue = {
  route: RouteRecord;
  mountRoute: (path: string) => void;
  unmountRoute: (path: string) => void;
};
const RouterContext = createContext<RouterContextValue>(null!);

export default function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteRecord>({});

  const mountRoute = useCallback(
    (path: string) => {
      (async () => {
        const component = lazy(() => import(`../../routes/${path}/Index.tsx`));
        setRoute(({ [path]: mounted, ...route }) => ({
          ...route,
          [path]: component,
        }));
      })();
    },
    [setRoute]
  );

  const unmountRoute = useCallback(
    (path: string) => {
      setRoute(({ [path]: _, ...route }) => route);
    },
    [setRoute]
  );

  useEffect(() => {
    console.log('useEffect');
    function handleMountRoute(path: string) {
      mountRoute(path);
    }

    function handleUnmountRoute(path: string) {
      unmountRoute(path);
    }

    alt.on('webview.mount', handleMountRoute);
    alt.on('webview.unmount', handleUnmountRoute);

    return () => {
      alt.off('webview.mount', handleMountRoute);
      alt.off('webview.unmount', handleUnmountRoute);
    };
  }, [mountRoute, unmountRoute]);

  return <RouterContext.Provider value={{ route, mountRoute, unmountRoute }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
