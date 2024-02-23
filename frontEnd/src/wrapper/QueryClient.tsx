import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type child = {
  children: React.ReactNode
}
const QueryClients = ({ children }: child) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryClients
