import { Toaster as Sonner } from "./components/ui/sonner";
import { ProvidersApp } from "./Providers";



export const App = () => {
  return (
    <ProvidersApp>
      <Sonner position="bottom-right" closeButton />
    </ProvidersApp>
  );
};
