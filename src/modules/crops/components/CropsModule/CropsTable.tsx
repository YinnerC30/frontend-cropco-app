import { DataTableTemplate } from '@/modules/core/components/DataTable';
import { useCropsModuleContext } from './CropsModuleContext';


export const CropsTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useCropsModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('crops', 'find_all_crops')
          ? 'No tienes permiso para ver el listado de cultivos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('crops', 'find_one_crop')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
