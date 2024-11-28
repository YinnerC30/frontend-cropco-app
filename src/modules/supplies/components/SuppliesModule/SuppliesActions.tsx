import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useSuppliesModuleContext } from './SuppliesModuleContext';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const SuppliesActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    isPending,
    handleDeleteBulkSupplies,
  } = useSuppliesModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('supplies', 'find_all_supplies')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !hasPermission('supplies', 'remove_bulk_supplies')
          }
          onClick={handleDeleteBulkSupplies}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SUPPLIES_PATHS.Create}
          disabled={!hasPermission('supplies', 'create_supply')}
          className=""
        />
      </div>
    </div>
  );
};
