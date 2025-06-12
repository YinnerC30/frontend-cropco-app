import {
  ButtonClearSelection,
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { useClientsModuleContext } from '../../hooks';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';
import { ButtonExportClients } from './ButtonExportClients';

export const ClientsActions: React.FC = () => {
  const {
    dataTable,
    mutationDeleteClients,
    queryClients,
    actionsClientsModule,
  } = useClientsModuleContext();

  const handleDeleteBulkClients = () => {
    mutationDeleteClients.mutate({
      clientsIds: dataTable.getIdsToRowsSelected(),
    });
  };

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={async () => {
          await queryClients.refetch();
        }}
        disabled={!actionsClientsModule['find_all_clients']}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonExportClients
          disabled={!actionsClientsModule['export_clients_pdf']}
        />

        <ButtonClearSelection
          onClick={() => dataTable.resetSelectionRows()}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            mutationDeleteClients.isPending ||
            !actionsClientsModule['remove_bulk_clients']
          }
          onClick={handleDeleteBulkClients}
          visible={dataTable.hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_CLIENTS_PATHS.Create}
          disabled={!actionsClientsModule['create_client']}
          className=""
        />
      </div>
    </div>
  );
};
