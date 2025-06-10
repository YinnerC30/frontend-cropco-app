import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useCropsModuleContext } from '../../hooks';
import { MODULE_CROPS_PATHS } from '../../routes/pathRoutes';

export const CropsActions: React.FC = () => {
  const {
    queryCrops,
    dataTable,
    mutationDeleteCrops,
    actionsCropsModule,
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
        onClick={async () => {
          await queryCrops.refetch();
        }}
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

        <ButtonCreateRecord
          route={MODULE_CROPS_PATHS.Create}
          disabled={!actionsCropsModule['create_crop']}
          className=""
        />
      </div>
    </div>
  );
};
