import { createContext, useContext } from 'react';

export type RouteRecord = Record<
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

export const RouterContext = createContext<RouterContextValue>(null!);

export function useRouter() {
  return useContext(RouterContext);
}
