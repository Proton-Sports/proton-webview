import { useState, type ReactNode } from 'react';
import { CategoryValuesContext } from './context';

export default function CategoryValuesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState({});
  return (
    <CategoryValuesContext.Provider value={{ categories, setCategories }}>{children}</CategoryValuesContext.Provider>
  );
}
