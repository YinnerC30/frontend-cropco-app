import React, { createContext, useContext } from 'react';
import { Table as TableType } from '@tanstack/react-table';

interface FormDataTableContextProps {
  table: TableType<any>;
  disabledDoubleClick: boolean;
  errorMessage: string;
  lengthColumns: number;
}

const FormDataTableContext = createContext<FormDataTableContextProps | any>(
  undefined
);

export const FormDataTableProvider = ({
  children,
  table,
  disabledDoubleClick,
  errorMessage,
  lengthColumns,
}: FormDataTableContextProps & { children: React.ReactNode }) => {
  const pageCount = table.getPageCount() > 0 ? table.getPageCount() : 0;
  // const pageText = `Página ${pageIndex + 1} de ${pageCount}`;

  return (
    <FormDataTableContext.Provider
      value={{
        table,
        disabledDoubleClick,
        errorMessage,
        lengthColumns,
        pageCount,
      }}
    >
      {children}
    </FormDataTableContext.Provider>
  );
};

export const useFormDataTableContext = () => {
  const context = useContext(FormDataTableContext);
  if (!context) {
    throw new Error(
      'useFormDataTableContext must be used within a FormDataTableProvider'
    );
  }
  return context;
};
