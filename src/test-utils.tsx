import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { store } from '@/redux/store';
import { AuthProvider } from '@/auth';
import { FormChangeProvider } from '@/modules/core/components';
import { SidebarProvider } from './components';

// Configuración optimizada de QueryClient para pruebas
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // Evita re-fetching automático
        gcTime: Infinity, // Mantiene cache indefinidamente
        refetchOnWindowFocus: false, // Evita refetch al enfocar ventana
        refetchOnReconnect: false, // Evita refetch al reconectar
      },
      mutations: {
        retry: false,
      },
    },
  });
};

// Props para el wrapper personalizado
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
  withAuth?: boolean;
  withFormChange?: boolean;
}

// Wrapper personalizado que incluye todos los providers necesarios
const AllTheProviders = ({
  children,
  queryClient = createTestQueryClient(),
  withAuth = true,
  withFormChange = true,
  withSideBar = true,
}: {
  children: React.ReactNode;
  queryClient?: QueryClient;
  withAuth?: boolean;
  withFormChange?: boolean;
  withSideBar?: boolean;
}) => {
  let content = children;

  if (withSideBar) {
    content = <SidebarProvider>{content}</SidebarProvider>;
  }

  if (withFormChange) {
    content = <FormChangeProvider>{content}</FormChangeProvider>;
  }

  if (withAuth) {
    content = <AuthProvider>{content}</AuthProvider>;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{content}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

// Función de renderizado personalizada
const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const {
    queryClient = createTestQueryClient(),
    withAuth = true,
    withFormChange = true,
    ...renderOptions
  } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders
        queryClient={queryClient}
        withAuth={withAuth}
        withFormChange={withFormChange}
      >
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Re-exportar todo desde testing-library
export * from '@testing-library/react';

// Exportar la función de renderizado personalizada
export { customRender as render };

// Exportar función para crear QueryClient de prueba
export { createTestQueryClient };

// Función helper para limpiar mocks y estado entre pruebas
export const setupTestEnvironment = () => {
  // Limpiar todos los mocks
  vi.clearAllMocks();

  // Limpiar localStorage
  localStorage.clear();

  // Limpiar sessionStorage
  sessionStorage.clear();

  // Limpiar cookies (si es necesario)
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

// Función helper para esperar a que el componente se estabilice
export const waitForStableComponent = async (timeout = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
};
