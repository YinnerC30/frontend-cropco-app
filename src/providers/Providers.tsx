import { FormChangeProvider, ThemeProvider } from '@/modules/core/components';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from '@/routes/Router';
import { DialogStatusProvider } from '@/components/common/DialogStatusContext';

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const ProvidersApp = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <DialogStatusProvider>
            <FormChangeProvider>
              <RouterProvider router={Router} />
              {children}
            </FormChangeProvider>
          </DialogStatusProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ReduxProvider>
  );
};
