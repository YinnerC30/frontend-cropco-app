import { Toaster as Sonner } from './components/ui/sonner';
import { ProvidersApp } from './providers/Providers';

export const App = () => {
  return (
    <ProvidersApp>
      <Sonner position="bottom-right" closeButton richColors />
    </ProvidersApp>
  );
};
