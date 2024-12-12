import { ThemeProvider } from '@/modules/core/components';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DialogStatusProvider } from '@/components/common/DialogStatusContext';
import { Router } from '@/routes/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

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
            <RouterProvider router={Router} />
            {children}
          </DialogStatusProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ReduxProvider>
  );
};
