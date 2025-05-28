import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import React, { createContext, useEffect, useMemo } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDeleteBulkClients } from '../../hooks/mutations/useDeleteBulkClients';
import { useGetAllClients } from '../../hooks/queries/useGetAllClients';
import { Client } from '../../interfaces/Client';
import { ClientsModuleActionsTable } from './ClientsModuleActionsTable';
import { columnsTableClients } from './columnsTableClients';

import { DataTableManualReturn } from '@/modules/core/hooks';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteClient } from '../../hooks';

export interface ClientsModuleContextProps {
  paramQuery: string;
  queryClients: UseQueryGetAllRecordsReturn<Client>;
  dataTable: DataTableManualReturn<Client>;
  mutationDeleteClients: UseMutationReturn<void, BulkRecords>;
  mutationDeleteClient: UseMutationReturn<void, string>;
  actionsClientsModule: Record<string, boolean>;
}

export const ClientsModuleContext = createContext<
  ClientsModuleContextProps | undefined
>(undefined);

export const ClientsModuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value } = useBasicQueryData();

  const {
    query: queryClients,
    pagination,
    setPagination,
  } = useGetAllClients({
    queryValue: value,
  });

  const { getActionsModule } = useAuthContext();

  const actionsClientsModule = useMemo(() => getActionsModule('clients'), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableClients,
    actions: ClientsModuleActionsTable,
  });

  const dataTable = useDataTableManual<Client>({
    columns: columnsTable,
    infoPagination: queryClients.isSuccess
      ? {
          pageCount: queryClients.data?.total_page_count ?? 0,
          rowCount: queryClients.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryClients.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteClients = useDeleteBulkClients();
  const mutationDeleteClient = useDeleteClient();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue: ClientsModuleContextProps = {
    paramQuery: value,
    queryClients,
    dataTable,
    mutationDeleteClients,
    mutationDeleteClient,
    actionsClientsModule,
  };

  return (
    <ClientsModuleContext.Provider value={contextValue}>
      {children}
    </ClientsModuleContext.Provider>
  );
};
