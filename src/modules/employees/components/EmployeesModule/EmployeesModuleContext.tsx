import { useAuthContext } from '@/modules/authentication/hooks';
import { useDataTable } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useContext, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useDeleteBulkEmployees, useGetAllEmployees } from '../../hooks';
import { useGetCertificationEmployee } from '../../hooks/queries/useGetCertificationEmployee';
import createColumnsTableEmployees from './createColumnsTableEmployees';

const EmployeesModuleContext = createContext<any>(null);

export const EmployeesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();
  const { width } = useWindowSize();
  const showActionsInFirstColumn = width < 1024;

  const { query, pagination, setPagination } = useGetAllEmployees({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

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

  const [userIdCertification, setUserIdCertification] = useState('');
  const [executeQuery, setExecuteQuery] = useState(false);

  const handleOnSuccessQuery = () => {
    setExecuteQuery(false);
    setUserIdCertification('');
  };

  const queryGetCertification = useGetCertificationEmployee({
    userId: userIdCertification,
    stateQuery: executeQuery,
    actionPDF: 'ViewPDF',
    actionOnSuccess: handleOnSuccessQuery,
  });

  const { mutate, isPending } = useDeleteBulkEmployees();

  const handleDeleteBulkEmployees = () => {
    mutate(
      { employeesIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

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
    handleDeleteBulkEmployees,
    isPending,
    queryGetCertification,
    userIdCertification,
    setUserIdCertification,
    setExecuteQuery,
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
