// FormChangeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto con la nueva propiedad y función
interface FormChangeContextType {
  hasUnsavedChanges: boolean;
  markChanges: (hasChanges: boolean) => void;
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

  return (
    <FormChangeContext.Provider
      value={{
        hasUnsavedChanges,
        markChanges,
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
