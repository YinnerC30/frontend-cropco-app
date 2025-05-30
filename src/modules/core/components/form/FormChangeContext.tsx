// FormChangeContext.tsx
// import { toast, ToastAction } from '@/components';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Definir el tipo para el contexto con la nueva propiedad y función
interface FormChangeContextType {
  hasUnsavedChanges: boolean;
  markChanges: (hasChanges: boolean) => void;
  showToast: ({
    route,
    skipRedirection,
    action,
  }: {
    route?: string;
    skipRedirection?: boolean;
    action?: () => void;
  }) => void;
}

// Crear el contexto con un valor inicial vacío para su tipado
const FormChangeContext = createContext<FormChangeContextType | undefined>(
  undefined
);

interface FormChangeProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const FormChangeProvider: React.FC<FormChangeProviderProps> = ({
  children,
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const markChanges = (hasChanges: boolean) => {
    setHasUnsavedChanges(hasChanges);
  };

  const navigate = useNavigate();

  const handleToastAction = (route: string, skipRedirection: boolean) => {
    markChanges(false);
    if (!skipRedirection) {
      navigate(route);
    }
  };

  const showToast = ({
    route = '/',
    skipRedirection = false,
    action,
  }: {
    route?: string;
    skipRedirection?: boolean;
    action?: () => void;
  }) => {
    toast('¡Atención! Cambios sin guardar.', {
      description: 'Tienes modificaciones pendientes en el formulario.',
      action: {
        label: 'Ignorar',
        onClick: () => {
          handleToastAction(route, skipRedirection);
          action && action();
        },
      },
    });
    // return toast({
    //   title: '¡Atención! Cambios sin guardar.',
    //   description: 'Tienes modificaciones pendientes en el formulario.',
    //   duration: 3_000,
    //   action: (
    //     <ToastAction
    //       altText="Descartar cambios y continuar"
    //       onClick={() => {
    //         handleToastAction(route, skipRedirection);
    //         action && action();
    //       }}
    //     >
    //       Descartar
    //     </ToastAction>
    //   ),
    // });
  };

  return (
    <FormChangeContext.Provider
      value={{
        hasUnsavedChanges,
        markChanges,
        showToast,
      }}
    >
      {children}
    </FormChangeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export function useFormChange(): FormChangeContextType {
  const context = useContext(FormChangeContext);
  if (!context) {
    throw new Error(
      'useFormChange debe ser usado dentro de un FormChangeProvider'
    );
  }
  return context;
}
