import {
  ButtonCreateRecord,
  ButtonDeleteBulk,
  ButtonRefetchData,
} from '@/modules/core/components';

import { ButtonClearSelection } from '@/modules/core/components/ButtonClearSelection';

import { useClientsModuleContext } from './ClientsModuleContext';
import { MODULE_CLIENTS_PATHS } from '../../routes/pathRoutes';
import { ButtonExportClients } from './ButtonExportClients';

export const ClientsActions = () => {
  const {
    query,
    hasPermission,
    hasSelectedRecords,
    resetSelectionRows,
    isPending,
    handleDeleteBulkClients,
  } = useClientsModuleContext();

  return (
    <div className="flex justify-between">
      <ButtonRefetchData
        onClick={query.refetch}
        disabled={!hasPermission('clients', 'find_all_clients')}
        className=""
      />

      <div className="flex items-center gap-1">
        <ButtonExportClients />

        <ButtonClearSelection
          onClick={() => resetSelectionRows()}
          visible={hasSelectedRecords}
        />

        <ButtonDeleteBulk
          disabled={
            isPending || !hasPermission('clients', 'remove_bulk_clients')
          }
          onClick={handleDeleteBulkClients}
          visible={hasSelectedRecords}
        />

        <ButtonCreateRecord
          route={MODULE_CLIENTS_PATHS.Create}
          disabled={!hasPermission('clients', 'create_client')}
          className=""
        />
      </div>
    </div>
  );
};
