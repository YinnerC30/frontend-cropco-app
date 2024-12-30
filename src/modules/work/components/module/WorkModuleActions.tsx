import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';

export const WorkModuleActions = () => {
  const {
    queryWorks,
    dataTable: {
      hasSelectedRecords,
      resetSelectionRows,

      getIdsToRowsSelected,
    },
    actionsWorksModule,
    mutationDeleteWorks,
  } = useWorkModuleContext();

  const { mutate, isPending } = mutationDeleteWorks;

  const handleDeleteBulkWorks = () => {
    mutate(
      { workIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={queryWorks.refetch}
        disabled={!actionsWorksModule['find_all_works']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !actionsWorksModule['remove_bulk_works']}
          onClick={handleDeleteBulkWorks}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_WORKS_PATHS.Create}
          disabled={!actionsWorksModule['create_work']}
          className=""
        />
      </div>
    </div>
  );
};
