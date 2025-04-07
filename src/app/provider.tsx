import type { NavigateOptions } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import { ToastProvider } from "@heroui/toast";
import { useHref, useNavigate } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-center" toastOffset={60} />
      {children}
    </NextUIProvider>
  );
}
