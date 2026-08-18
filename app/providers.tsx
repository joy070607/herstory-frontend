"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PhoneShell } from "@/components/layout/PhoneShell";
import { useAuthStore } from "@/store/authStore";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PhoneShell>{children}</PhoneShell>
    </QueryClientProvider>
  );
}
