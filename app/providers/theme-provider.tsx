'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ComponentProps, useEffect, useState } from 'react';

const ThemeProvider = ({ children, ...props }: Readonly<ComponentProps<typeof NextThemeProvider>>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted ? <NextThemeProvider {...props}>{children}</NextThemeProvider> : <></>}</>;
};

export default ThemeProvider;
