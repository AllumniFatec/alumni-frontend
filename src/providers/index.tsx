"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
