import { AlertProvider } from "@/context/AlertContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ReactNode } from "react";

export function Context({ children }: { children: ReactNode }) {
  return (
    <AlertProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
    </AlertProvider>
  );
}
