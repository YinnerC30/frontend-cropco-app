import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';
import { useCropsModuleContext } from './CropsModuleContext';

export const CropsActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    isPending,
    handleDeleteBulkCrops,
  } = useCropsModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('crops', 'find_all_crops')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !hasPermission('crops', 'remove_bulk_crops')}
          onClick={handleDeleteBulkCrops}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_CROPS_PATHS.Create}
          disabled={!hasPermission('crops', 'create_crop')}
          className=""
        />
      </div>
    </div>
  );
};
