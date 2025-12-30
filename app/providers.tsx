"use client";

import { SessionProvider } from "next-auth/react";
import MainNavigation from "@/components/layout/main-navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MainNavigation />
      {children}
    </SessionProvider>
  );
}
