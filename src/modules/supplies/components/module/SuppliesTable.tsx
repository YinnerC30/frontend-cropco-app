import { DataTableTemplate } from '@/modules/core/components';
import React from 'react';
import { useSuppliesModuleContext } from '../../hooks';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';
import { SelectedVolumeUnitOfMeasure } from '@/modules/core/components/shared/SelectedVolumeUnitOfMeasure';

export const SuppliesTable: React.FC = () => {
  const {
    dataTable: { table, lengthColumns },
    querySupplies,
    actionsSuppliesModule,
    mutationDeleteSupplies,
    mutationDeleteSupply,
    unitMassTypeToShowAmount,
    setMassUnitTypeToShowAmount,
    unitVolumeTypeToShowAmount,
    setUnitVolumeTypeToShowAmount,
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
    >
      <div className="flex items-center justify-end gap-2 pb-2">
        <p className="text-sm font-medium text-muted-foreground">
          Mostrar inventario de masa como:
        </p>
        <div className="font-medium">
          {' '}
          <SelectedMassUnitOfMeasure
            onChange={setMassUnitTypeToShowAmount}
            valueSelect={unitMassTypeToShowAmount}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pb-2">
        <p className="text-sm font-medium text-muted-foreground">
          Mostrar inventario de volumen como:
        </p>
        <div className="font-medium">
          {' '}
          <SelectedVolumeUnitOfMeasure
            onChange={setUnitVolumeTypeToShowAmount}
            valueSelect={unitVolumeTypeToShowAmount}
          />
        </div>
      </div>
    </DataTableTemplate>
  );
};
