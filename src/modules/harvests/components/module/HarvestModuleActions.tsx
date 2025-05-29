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
    queryCrops,
    queryEmployees,
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

  const handleRefetchData = async () => {
    await Promise.all([
      queryHarvests.refetch(),
      queryCrops.refetch(),
      queryEmployees.refetch(),
    ]);
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={handleRefetchData}
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
