import { DataTableTemplate } from '@/modules/core/components';
import { useCropsModuleContext } from '../../hooks';

export const CropsTable: React.FC = () => {
  const { dataTable, queryCrops, mutationDeleteCrops, actionsCropsModule, mutationDeleteCrop } =
    useCropsModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsCropsModule['find_all_crops']
          ? 'No tienes permiso para ver el listado de cultivos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsCropsModule['find_one_crop']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryCrops.data?.rowCount ?? 0}
      isLoading={
        queryCrops.isLoading ||
        queryCrops.isRefetching ||
        mutationDeleteCrops.isPending ||
        mutationDeleteCrop.isPending
      }
    />
  );
};
