import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

export const HarvestModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    handleDeleteBulkHarvests,
    isPending,
    hasPermission,
  } = useHarvestModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('harvests', 'find_all_harvests')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !hasPermission('harvests', 'remove_bulk_harvests')
          }
          onClick={handleDeleteBulkHarvests}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_HARVESTS_PATHS.Create}
          disabled={!hasPermission('harvests', 'create_harvest')}
          className=""
        />
      </div>
    </div>
  );
};
