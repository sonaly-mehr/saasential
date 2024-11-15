"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode; // Explicitly type the children prop as ReactNode
}
const Provider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
