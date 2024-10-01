import { type ReactNode, createContext, lazy, useCallback, useContext, useEffect, useState } from 'react';

type RouteRecord = Record<
  string,
  {
    Component: React.LazyExoticComponent<React.ComponentType<object>>;
    props?: object;
  }
>;
type RouterContextValue = {
  route: RouteRecord;
  mountRoute: (path: string, props?: object) => void;
  unmountRoute: (path: string) => void;
};
const RouterContext = createContext<RouterContextValue>(null!);

export default function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteRecord>({});

  const mountRoute = useCallback(
    (path: string, props?: object) => {
      (async () => {
        setRoute(({ [path]: mounted, ...route }) => {
          if (mounted != null) {
            alt.emit('webview.mount', path, true, false);
          } else {
            mounted = {
              Component: lazy(() =>
                import(`../../routes/${path}/Index.tsx`).then((v) => {
                  alt.emit('webview.mount', path, true, true);
                  return v;
                })
              ),
              props,
            };
          }
          return {
            ...route,
            [path]: mounted,
          };
        });
      })();
    },
    [setRoute]
  );

  const unmountRoute = useCallback(
    (path: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setRoute(({ [path]: unmountingRoute, ...route }) => {
        alt.emit('webview.unmount', path, true, unmountingRoute != null);
        return route;
      });
    },
    [setRoute]
  );

  useEffect(() => {
    function handleMountRoute(path: string, props?: object) {
      mountRoute(path, props);
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
