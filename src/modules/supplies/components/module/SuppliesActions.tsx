import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import React from 'react';
import { useSuppliesModuleContext } from '../../hooks';
import { MODULE_SUPPLIES_PATHS } from '../../routes/pathRoutes';

export const SuppliesActions: React.FC = () => {
  const {
    querySupplies,
    mutationDeleteSupplies,
    dataTable,
    actionsSuppliesModule,
  } = useSuppliesModuleContext();

  const handleDeleteBulkSupplies = () => {
    mutationDeleteSupplies.mutate(
      { suppliesIds: dataTable.getIdsToRowsSelected() },
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
          await querySupplies.refetch();
        }}
        disabled={!actionsSuppliesModule['find_all_supplies']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteSupplies.isPending ||
            !actionsSuppliesModule['remove_bulk_supplies']
          }
          onClick={handleDeleteBulkSupplies}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_SUPPLIES_PATHS.Create}
          disabled={!actionsSuppliesModule['create_supply']}
          className=""
        />
      </div>
    </div>
  );
};
