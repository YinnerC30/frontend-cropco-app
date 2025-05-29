import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useShoppingModuleContext } from '../../hooks/context/useShoppingModuleContext';

import { MODULE_SHOPPING_PATHS } from '../../routes/pathRoutes';

export const ShoppingModuleActions: React.FC = () => {
  const {
    queryShopping,
    dataTable: { hasSelectedRecords, resetSelectionRows, getIdsToRowsSelected },

    actionsShoppingModule,
    mutationDeleteShopping: { mutate, isPending },
    querySuppliers,
    querySupplies,
  } = useShoppingModuleContext();

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

  const handleRefetchData = async () => {
    await Promise.all([
      queryShopping.refetch(),
      querySuppliers.refetch(),
      querySupplies.refetch(),
    ]);
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={handleRefetchData}
        disabled={!actionsShoppingModule['find_all_supplies_shopping']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !actionsShoppingModule['remove_bulk_supplies_shopping']
          }
          onClick={handleDeleteBulkShopping}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SHOPPING_PATHS.Create}
          disabled={!actionsShoppingModule['create_supply_shopping']}
          className=""
        />
      </div>
    </div>
  );
};
