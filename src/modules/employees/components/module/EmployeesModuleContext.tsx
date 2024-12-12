import { useAuthContext } from '@/auth/hooks';
import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useState } from 'react';
import { useWindowSize } from 'react-use';
import { useDeleteBulkEmployees, useGetAllEmployees } from '../../hooks';
import { useGetCertificationEmployee } from '../../hooks/queries/useGetCertificationEmployee';
import { EmployeesModuleActionsTable } from './EmployeesModuleActionsTable';
import { columnsTableEmployees } from './columnsTableEmployees';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';

export const EmployeesModuleContext = createContext<any>(null);

export const EmployeesModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { value } = useBasicQueryData();

  const { query, pagination, setPagination } = useGetAllEmployees({
    searchParameter: value,
    allRecords: false,
  });

  const { hasPermission } = useAuthContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableEmployees,
    actions: EmployeesModuleActionsTable,
  });

  const {
    table,
    lengthColumns,
    getIdsToRowsSelected,
    resetSelectionRows,
    hasSelectedRecords,
  } = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows:
      (hasPermission('employees', 'find_all_employees') && query.data?.rows) ??
      [],
    pagination,
    setPagination,
  });

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
