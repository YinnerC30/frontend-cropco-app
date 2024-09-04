import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { ProvidersApp } from "./Providers";

export const App = () => {
  return (
    <ProvidersApp>
      <Sonner position="bottom-right" closeButton />
      <Toaster />
    </ProvidersApp>
  );
};
