"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'


const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60, // 24 hours
    },
  },
});

export function ReactQueryClientProvider(props: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider client={queryClient}  persistOptions={{ persister }}>
      {props.children}
    </PersistQueryClientProvider>
  );
}
