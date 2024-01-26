import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'base';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ className, variant = 'base', ...props }: Props) {
  return <button {...props} className={clsx('c-btn', `c-btn--${variant}`, className)} />;
}
