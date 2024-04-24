'use client';

import { createContext, useContext, ReactNode } from 'react';

export type LoginUser = {
  id: string;
  name: string;
  email: string;
};

const LoginUserContext = createContext<LoginUser | null>(null);

export type UseLoginUser = () => LoginUser | null;
export const useLoginUser: UseLoginUser = () => useContext(LoginUserContext);

export const LoginUserProvider: React.FC<{
  children: ReactNode;
  user: LoginUser | null;
}> = ({ children, user }) => {
  return <LoginUserContext.Provider value={user}>{children}</LoginUserContext.Provider>;
};
