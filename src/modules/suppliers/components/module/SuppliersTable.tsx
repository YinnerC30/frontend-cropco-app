import { DataTableTemplate } from '@/modules/core/components';
import { useSuppliersModuleContext } from '../../hooks';

export const SuppliersTable: React.FC = () => {
  const {
    dataTable,
    actionsSuppliersModule,
    mutationDeleteSuppliers,
    querySuppliers,
    mutationDeleteSupplier,
  } = useSuppliersModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsSuppliersModule['find_all_suppliers']
          ? 'No tienes permiso para ver el listado de proveedores 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsSuppliersModule['find_one_supplier']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={querySuppliers.data?.total_row_count ?? 0}
      isLoading={
        querySuppliers.isLoading ||
        querySuppliers.isRefetching ||
        mutationDeleteSuppliers.isPending ||
        mutationDeleteSupplier.isPending
      }
    />
  );
};
