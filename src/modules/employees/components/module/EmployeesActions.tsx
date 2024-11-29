import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';
import { useEmployeesModuleContext } from '../../hooks';


export const EmployeesActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    isPending,
    handleDeleteBulkEmployees,
  } = useEmployeesModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('employees', 'find_all_employees')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !hasPermission('employees', 'remove_bulk_employees')
          }
          onClick={handleDeleteBulkEmployees}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_EMPLOYEE_PATHS.Create}
          disabled={!hasPermission('employees', 'create_employee')}
          className=""
        />
      </div>
    </div>
  );
};
