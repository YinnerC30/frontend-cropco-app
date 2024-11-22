import {
  ButtonCreateRecord,
  ButtonRefetchData,
} from '@/modules/core/components';

import { ButtonClearSelection } from '@/modules/core/components/ButtonClearSelection';

import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';
import { useEmployeesModuleContext } from './EmployeesModuleContext';

export const EmployeesActions = () => {
  const { query, hasPermission, hasSelectedRecords, resetSelectionRows } =
    useEmployeesModuleContext();

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

        <ButtonCreateRecord
          route={MODULE_EMPLOYEE_PATHS.Create}
          disabled={!hasPermission('employees', 'create_employee')}
          className=""
        />
      </div>
    </div>
  );
};
