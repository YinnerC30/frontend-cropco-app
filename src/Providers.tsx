import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './modules/core/components';
import { store } from './redux/store';
import { Router } from './routes/Router';
import { FormChangeProvider } from './modules/core/components/form/FormChangeContext';

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const ProvidersApp = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <FormChangeProvider>
            <RouterProvider router={Router} />
            {children}
          </FormChangeProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ReduxProvider>
  );
};
