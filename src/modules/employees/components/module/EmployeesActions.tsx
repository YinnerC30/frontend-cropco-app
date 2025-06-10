import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useEmployeesModuleContext } from '../../hooks';
import { MODULE_EMPLOYEE_PATHS } from '../../routes/pathRoutes';

export const EmployeesActions: React.FC = () => {
  const {
    queryEmployees,
    mutationDeleteEmployees,
    dataTable,
    actionsEmployeesModule,
  } = useEmployeesModuleContext();

  const handleDeleteBulkEmployees = () => {
    mutationDeleteEmployees.mutate(
      { employeesIds: dataTable.getIdsToRowsSelected() },
      {
        onSuccess: () => {
          dataTable.resetSelectionRows();
        },
      }
    );
  };
  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await queryEmployees.refetch();
        }}
        disabled={!actionsEmployeesModule['find_all_employees']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteEmployees.isPending ||
            !actionsEmployeesModule['remove_bulk_employees']
          }
          onClick={handleDeleteBulkEmployees}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_EMPLOYEE_PATHS.Create}
          disabled={!actionsEmployeesModule['create_employee']}
          className=""
        />
      </div>
    </div>
  );
};
