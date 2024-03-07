"use client"

import { createContext, useContext, ReactNode } from "react"

export type LoginUser = {
  id: string;
  name: string;
  email: string;
}

type Props = {
  children: ReactNode,
  user: LoginUser | null,
}

const LoginUserContext = createContext<LoginUser | null>(null);

export const useLoginUser = () => useContext(LoginUserContext);
export const LoginUserProvider = ({ children, user }: Props) => {
  return (
    <LoginUserContext.Provider value={user}>
      {children}
    </LoginUserContext.Provider>
  );
};
