import { DataTableTemplate } from '@/modules/core/components';
import { useClientsModuleContext } from '../../hooks';

export const ClientsTable: React.FC = () => {
  const {
    dataTable,
    queryClients,
    mutationDeleteClients,
    actionsClientsModule,
  } = useClientsModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsClientsModule['find_all_clients']
          ? 'No tienes permiso para ver el listado de empleados 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsClientsModule['find_one_client']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryClients.data?.rowCount ?? 0}
      isLoading={
        queryClients.isLoading ||
        queryClients.isRefetching ||
        mutationDeleteClients.isPending
      }
    />
  );
};
