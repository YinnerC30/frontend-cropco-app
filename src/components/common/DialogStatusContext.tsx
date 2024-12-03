import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir la estructura del contexto
interface DialogStatusContextType {
  isActiveDialog: boolean;
  setIsActiveDialog: (isActive: boolean) => void;
}

// Crear el contexto con un valor predeterminado
const DialogStatusContext = createContext<DialogStatusContextType | undefined>(
  undefined
);

// Crear el proveedor del contexto
export const DialogStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isActiveDialog, setIsActiveDialog] = useState<boolean>(false);

  return (
    <DialogStatusContext.Provider value={{ isActiveDialog, setIsActiveDialog }}>
      {children}
    </DialogStatusContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useDialogStatus = (): DialogStatusContextType => {
  const context = useContext(DialogStatusContext);
  if (!context) {
    throw new Error(
      'useDialogStatus must be used within a DialogStatusProvider'
    );
  }
  return context;
};
