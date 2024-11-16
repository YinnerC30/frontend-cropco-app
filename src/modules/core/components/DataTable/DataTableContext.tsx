import React, { createContext, useContext } from 'react';
import { Table as TableType } from '@tanstack/react-table';

interface DataTableContextProps {
  table: TableType<any>;
  disabledDoubleClick: boolean;
  errorMessage: string;
  lengthColumns: number;
  rowCount: number;
  isLoading: boolean;
}

const DataTableContext = createContext<DataTableContextProps | any>(undefined);

export const DataTableProvider = ({
  children,
  table,
  disabledDoubleClick,
  errorMessage,
  lengthColumns,
  rowCount,
  isLoading = false,
}: DataTableContextProps & { children: React.ReactNode }) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount() > 0 ? table.getPageCount() : 0;
  const pageText = `Página ${pageIndex + 1} de ${pageCount}`;
  return (
    <DataTableContext.Provider
      value={{
        table,
        disabledDoubleClick,
        errorMessage,
        lengthColumns,
        rowCount,
        isLoading,
        pageIndex,
        pageCount,
        pageText,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = () => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider'
    );
  }
  return context;
};
