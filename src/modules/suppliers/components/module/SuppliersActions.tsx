import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';

import { useSuppliersModuleContext } from '../../hooks';
import React from 'react';

export const SuppliersActions: React.FC = () => {
  const {
    querySuppliers,
    dataTable,
    mutationDeleteSuppliers,
    actionsSuppliersModule,
  } = useSuppliersModuleContext();

  const handleDeleteBulkSuppliers = () => {
    mutationDeleteSuppliers.mutate(
      { suppliersIds: dataTable.getIdsToRowsSelected() },
      {
        onSuccess: () => {
          dataTable.resetSelectionRows();
        },
      }
    );
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await querySuppliers.refetch();
        }}
        disabled={!actionsSuppliersModule['find_all_suppliers']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteSuppliers.isPending ||
            !actionsSuppliersModule['remove_bulk_suppliers']
          }
          onClick={handleDeleteBulkSuppliers}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SUPPLIER_PATHS.Create}
          disabled={!actionsSuppliersModule['create_supplier']}
          className=""
        />
      </div>
    </div>
  );
};
