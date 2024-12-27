import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import React from 'react';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';

export const HarvestModuleActions: React.FC = () => {
  const {
    queryHarvests,
    dataTable,
    actionsHarvestsModule,
    mutationDeleteHarvests,
  } = useHarvestModuleContext();

  const handleDeleteBulkHarvests = () => {
    mutationDeleteHarvests.mutate(
      { harvestIds: dataTable.getIdsToRowsSelected() },
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
        onClick={queryHarvests.refetch}
        disabled={!actionsHarvestsModule['find_all_harvests']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteHarvests.isPending ||
            !actionsHarvestsModule['remove_bulk_harvests']
          }
          onClick={handleDeleteBulkHarvests}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_HARVESTS_PATHS.Create}
          disabled={!actionsHarvestsModule['create_harvest']}
          className=""
        />
      </div>
    </div>
  );
};
