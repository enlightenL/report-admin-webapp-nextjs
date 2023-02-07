// import package modules
import { useState } from 'react';

// Import global modules
import { createProvider } from '@/utils';

// Import local modules

function useContexts() {
  const [count, setCount] = useState<number>(0);

  return { count, setCount };
}

export const { Provider, useContext } = createProvider(useContexts);
