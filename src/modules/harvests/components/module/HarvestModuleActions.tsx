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
  } = useHarvestModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={false}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending}
          onClick={handleDeleteBulkHarvests}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_HARVESTS_PATHS.Create}
          disabled={false}
          className=""
        />
      </div>
    </div>
  );
};
