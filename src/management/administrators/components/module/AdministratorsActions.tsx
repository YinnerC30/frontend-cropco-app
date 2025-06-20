import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonRefetchData
} from '@/modules/core/components';
import { useAdministratorsModuleContext } from '../../hooks/context/useAdministratorsModuleContext';
import { MODULE_ADMINISTRATORS_PATHS } from '../../routes/pathsRoutes';

export const AdministratorsActions: React.FC = () => {
  const {
    queryAdministrators,
    dataTable,
    // mutationDeleteAdministrators,
    // actionsAdministratorsModule,
  } = useAdministratorsModuleContext();

  // const handleDeleteBulkAdministrators = (): void => {
  //   mutationDeleteAdministrators.mutate(
  //     { userIds: dataTable.getIdsToRowsSelected() },
  //     {
  //       onSuccess: () => {
  //         dataTable.resetSelectionRows();
  //       },
  //     }
  //   );
  // };

  const { resetSelectionRows, hasSelectedRecords } = dataTable;

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await queryAdministrators.refetch();
        }}
        disabled={false}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={resetSelectionRows}
          visible={hasSelectedRecords}
        />

        {/* <ButtonDeleteBulk
          disabled={
            mutationDeleteAdministrators.isPending ||
            !actionsAdministratorsModule['remove_bulk_users']
          }
          onClick={handleDeleteBulkAdministrators}
          visible={hasSelectedRecords}
        /> */}

        <ButtonCreateRecord
          route={MODULE_ADMINISTRATORS_PATHS.Create}
          disabled={false}
        />
      </div>
    </div>
  );
};
