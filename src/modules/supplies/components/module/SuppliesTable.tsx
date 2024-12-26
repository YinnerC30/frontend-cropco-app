import { DataTableTemplate } from '@/modules/core/components';
import React from 'react';
import { useSuppliesModuleContext } from '../../hooks';

export const SuppliesTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    querySupplies,
    actionsSuppliesModule,
    mutationDeleteSupplies: { isPending },
  } = useSuppliesModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsSuppliesModule['find_all_supplies']
          ? 'No tienes permiso para ver el listado de suministros 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsSuppliesModule['find_one_supply']}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={querySupplies.data?.rowCount ?? 0}
      isLoading={
        querySupplies.isLoading || querySupplies.isRefetching || isPending
      }
    />
  );
};
