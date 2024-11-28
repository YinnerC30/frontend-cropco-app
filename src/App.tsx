import { Toaster as Sonner } from 'sonner';
import { Toaster } from './components/ui/toaster';
import { ProvidersApp } from './providers/Providers';

export const App = () => {
  return (
    <ProvidersApp>
      <Sonner position="top-center" richColors />
      <Toaster />
    </ProvidersApp>
  );
};
