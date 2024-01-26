import { useState } from 'react';
import NormalMode from './NormalMode';
import FreeMode from './FreeMode';

export type Mode = 'free' | 'normal';

export default function Index() {
  const [mode, setMode] = useState<Mode>('normal');

  function handleChangeMode(mode: string) {
    alt.emit('race:creator:changeMode', mode);
    setMode(mode as Mode);
  }

  if (mode === 'normal') return <NormalMode onChangeMode={handleChangeMode} />;
  return <FreeMode onChangeMode={handleChangeMode} />;
}
