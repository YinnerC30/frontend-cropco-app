import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';
import { useDeleteBulkShopping } from '../../hooks/mutations/useDeleteBulkShopping';

export const ShoppingModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsShopping,
    getIdsToRowsSelected,
  } = useShoppingModuleContext();

  const { mutate, isPending } = useDeleteBulkShopping();

  const handleDeleteBulkShopping = () => {
    mutate(
      { shoppingIds: getIdsToRowsSelected() },
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
        disabled={!permissionsShopping['find_all_supplies_shopping']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !permissionsShopping['remove_bulk_supplies_shopping']
          }
          onClick={handleDeleteBulkShopping}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SHOPPING_PATHS.Create}
          disabled={!permissionsShopping['create_supply_shopping']}
          className=""
        />
      </div>
    </div>
  );
};
