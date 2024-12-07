import { DataTableTemplate } from '@/modules/core/components';
import { useHarvestModuleContext } from '../../hooks/context/useHarvestModuleContext';

export const HarvestModuleTable = () => {
  const { table, lengthColumns, query } = useHarvestModuleContext();

  return (
    <DataTableTemplate
      errorMessage={'No hay registros'}
      disabledDoubleClick={false}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query?.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching}
    />
  );
};
