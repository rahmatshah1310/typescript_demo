import { BrowserRouter } from "react-router-dom"
import AppRoutes from "../routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@context";

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, 
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes /> 
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App
