import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./routes/Router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./modules/core/components";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={Router} />
            <Toaster position="bottom-right" closeButton />
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </>
  );
};
