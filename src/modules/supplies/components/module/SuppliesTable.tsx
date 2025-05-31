import { DataTableTemplate } from '@/modules/core/components';
import React from 'react';
import { useSuppliesModuleContext } from '../../hooks';

export const SuppliesTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    querySupplies,
    actionsSuppliesModule,
    mutationDeleteSupplies,
    mutationDeleteSupply,
  } = useSuppliesModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsSuppliesModule['find_all_supplies']
          ? 'No tienes permiso para ver el listado de insumos 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsSuppliesModule['find_one_supply']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={querySupplies.data?.total_row_count ?? 0}
      isLoading={
        querySupplies.isLoading ||
        querySupplies.isRefetching ||
        mutationDeleteSupplies.isPending ||
        mutationDeleteSupply.isPending
      }
    />
  );
};
