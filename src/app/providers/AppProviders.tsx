import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ServiceContainerProvider } from "@/app/providers/ServiceContainerProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ServiceContainerProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ServiceContainerProvider>
  );
}
