import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useWorkModuleContext } from '../../hooks/context/useWorkModuleContext';
import { useDeleteBulkWorks } from '../../hooks/mutations/useDeleteBulkWorks';
import { MODULE_WORKS_PATHS } from '../../routes/pathRoutes';

export const WorkModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsWork,
    getIdsToRowsSelected,
  } = useWorkModuleContext();

  const { mutate, isPending } = useDeleteBulkWorks();

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
        onClick={query.refetch}
        disabled={!permissionsWork['find_all_works']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !permissionsWork['remove_bulk_works']}
          onClick={handleDeleteBulkWorks}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_WORKS_PATHS.Create}
          disabled={!permissionsWork['create_work']}
          className=""
        />
      </div>
    </div>
  );
};
