import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./modules/core/components";
import { store } from "./redux/store";
import { Router } from "./routes/Router";

import { Toaster } from "./components/ui/toaster";
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const ProvidersApp = ({ children }: Props) => {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={Router} />
            {children}
            <Toaster />
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </>
  );
};
