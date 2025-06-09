import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';
import { useCropsModuleContext } from '../../hooks';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';

export const CropsActions: React.FC = () => {
  const {
    queryCrops,
    dataTable,
    mutationDeleteCrops,
    actionsCropsModule,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  } = useCropsModuleContext();

  const handleDeleteBulkCrops = () => {
    mutationDeleteCrops.mutate(
      { cropsIds: dataTable.getIdsToRowsSelected() },
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
        onClick={queryCrops.refetch}
        disabled={!actionsCropsModule['find_all_crops']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteCrops.isPending ||
            !actionsCropsModule['remove_bulk_crops']
          }
          onClick={handleDeleteBulkCrops}
          visible={dataTable.hasSelectedRecords}
        />

        <SelectedMassUnitOfMeasure onChange={setUnitTypeToShowAmount} valueSelect={unitTypeToShowAmount} />

        <ButtonCreateRecord
          route={MODULE_CROPS_PATHS.Create}
          disabled={!actionsCropsModule['create_crop']}
          className=""
        />
      </div>
    </div>
  );
};
