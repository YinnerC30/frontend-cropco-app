import { useAuthorization } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext } from 'react';
import { useWindowSize } from 'react-use';
import createColumnsTableEmployees from './createColumnsTableEmployees';
import { useGetAllEmployees } from '../../hooks/useGetAllEmployees';

const EmployeesModuleContext = createContext<any>(null);

export const EmployeesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();

  const { query, pagination, setPagination } = useGetAllEmployees({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthorization();

  const showActionsInFirstColumn = width < 1024;

  const { table, lengthColumns, getIdsToRowsSelected, resetSelectionRows } =
    useDataTable({
      columns: createColumnsTableEmployees(showActionsInFirstColumn),
      data: query.data ?? [],
      rows:
        (hasPermission('employees', 'find_all_employees') &&
          query.data?.rows) ??
        [],
      pagination,
      setPagination,
    });

  const hasSelectedRecords = getIdsToRowsSelected().length > 0;

  const contextValue = {
    value,
    query,
    hasPermission,
    showActionsInFirstColumn,
    table,
    lengthColumns,
    hasSelectedRecords,
    resetSelectionRows,
    pagination,
    setPagination,
  };

  return (
    <EmployeesModuleContext.Provider value={contextValue}>
      {children}
    </EmployeesModuleContext.Provider>
  );
};

export const useEmployeesModuleContext = () => {
  const context = useContext(EmployeesModuleContext);
  if (!context) {
    throw new Error(
      'useEmployeesModuleContext must be used within EmployeesModuleProvider'
    );
  }
  return context;
};
