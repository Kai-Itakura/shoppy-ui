'use client';

import { ReactNode } from 'react';
import { AuthContext } from './auth-context';

type AuthContextProviderProps = {
  children: ReactNode;
  isAuthenticate: boolean;
};

export default function AuthContextProvider({ children, isAuthenticate }: AuthContextProviderProps) {
  return <AuthContext.Provider value={isAuthenticate}>{children}</AuthContext.Provider>;
}
