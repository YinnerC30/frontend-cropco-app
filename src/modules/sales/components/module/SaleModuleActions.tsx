import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';
import { useDeleteBulkSales } from '../../hooks/mutations/useDeleteBulkSales';

export const SaleModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsSale,
    getIdsToRowsSelected,
  } = useSaleModuleContext();

  const { mutate, isPending } = useDeleteBulkSales();

  const handleDeleteBulkSales = () => {
    mutate(
      { saleIds: getIdsToRowsSelected() },
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
        disabled={!permissionsSale['find_all_sales']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !permissionsSale['remove_bulk_sales']}
          onClick={handleDeleteBulkSales}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SALES_PATHS.Create}
          disabled={!permissionsSale['create_sale']}
          className=""
        />
      </div>
    </div>
  );
};
