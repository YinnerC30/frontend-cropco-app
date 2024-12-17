import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';
import { useConsumptionModuleContext } from '../../hooks/context/useConsumptionModuleContext';

import { MODULE_CONSUMPTION_PATHS } from '../../routes/pathRoutes';
import { useDeleteBulkConsumption } from '../../hooks/mutations/useDeleteBulkConsumption';

export const ConsumptionModuleActions = () => {
  const {
    query,
    hasSelectedRecords,
    resetSelectionRows,
    permissionsConsumption,
    getIdsToRowsSelected,
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

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!permissionsConsumption['find_all_supplies_consumption']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !permissionsConsumption['remove_bulk_supplies_consumption']
          }
          onClick={handleDeleteBulkConsumption}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_CONSUMPTION_PATHS.Create}
          disabled={!permissionsConsumption['create_supply_consumption']}
          className=""
        />
      </div>
    </div>
  );
};
