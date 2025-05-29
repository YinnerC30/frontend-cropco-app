import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useSaleModuleContext } from '../../hooks/context/useSaleModuleContext';

import React from 'react';
import { useDeleteBulkSales } from '../../hooks/mutations/useDeleteBulkSales';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';

export const SaleModuleActions: React.FC = () => {
  const {
    querySales,
    dataTable: { hasSelectedRecords, resetSelectionRows, getIdsToRowsSelected },
    actionsSalesModule,
    queryClients,
    queryCrops,
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

  const handleRefetchData = async () => {
    await Promise.all([
      querySales.refetch(),
      queryCrops.refetch(),
      queryClients.refetch(),
    ]);
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={handleRefetchData}
        disabled={!actionsSalesModule['find_all_sales']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={isPending || !actionsSalesModule['remove_bulk_sales']}
          onClick={handleDeleteBulkSales}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SALES_PATHS.Create}
          disabled={!actionsSalesModule['create_sale']}
          className=""
        />
      </div>
    </div>
  );
};
