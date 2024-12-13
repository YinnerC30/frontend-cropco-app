import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { useDeleteBulkHarvests } from '../../hooks/mutations/useDeleteBulkHarvests';

export const HarvestModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsHarvest,
    getIdsToRowsSelected,
  } = useHarvestModuleContext();

  const { mutate, isPending } = useDeleteBulkHarvests();

  const handleDeleteBulkHarvests = () => {
    mutate(
      { harvestIds: getIdsToRowsSelected() },
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
        disabled={!permissionsHarvest['find_all_harvests']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !permissionsHarvest['remove_bulk_harvests']}
          onClick={handleDeleteBulkHarvests}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_HARVESTS_PATHS.Create}
          disabled={!permissionsHarvest['create_harvest']}
          className=""
        />
      </div>
    </div>
  );
};
