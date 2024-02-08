import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type child = {
  children: React.ReactNode;
};
const QueryClients = ({ children }: child) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true}/>
      {children}</QueryClientProvider>
  );
};

export default QueryClients;
