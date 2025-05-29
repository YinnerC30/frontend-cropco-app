import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';

import { useDeleteBulkConsumption } from '../../hooks/mutations/useDeleteBulkConsumption';
import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';

export const ConsumptionModuleActions: React.FC = () => {
  const {
    queryConsumptions,
    dataTable: { hasSelectedRecords, resetSelectionRows, getIdsToRowsSelected },

    actionsConsumptionsModule,
    queryCrops,
    querySupplies,
  } = useConsumptionModuleContext();

  const { mutate, isPending } = useDeleteBulkConsumption();

  const handleDeleteBulkConsumption = () => {
    mutate(
      { consumptionIds: getIdsToRowsSelected() },
      {
        onSuccess: () => {
          resetSelectionRows();
        },
      }
    );
  };

  const handleRefetchData = async () => {
    await Promise.all([
      queryConsumptions.refetch(),
      queryCrops.refetch(),
      querySupplies.refetch(),
    ]);
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={handleRefetchData}
        disabled={!actionsConsumptionsModule['find_all_supplies_consumption']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending ||
            !actionsConsumptionsModule['remove_bulk_supplies_consumption']
          }
          onClick={handleDeleteBulkConsumption}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_CONSUMPTION_PATHS.Create}
          disabled={!actionsConsumptionsModule['create_supply_consumption']}
          className=""
        />
      </div>
    </div>
  );
};
