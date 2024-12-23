import { useAuthContext } from '@/auth/hooks';
import { useDataTableManual } from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import React, { createContext, useMemo } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDeleteBulkClients } from '../../hooks/mutations/useDeleteBulkClients';
import { useGetAllClients } from '../../hooks/queries/useGetAllClients';
import { Client } from '../../interfaces/Client';
import { ClientsModuleActionsTable } from './ClientsModuleActionsTable';
import { columnsTableClients } from './columnsTableClients';

import { DataTableManualReturn } from '@/modules/core/hooks';
import {
  BulkRecords,
  ResponseApiGetAllRecords,
} from '@/modules/core/interfaces';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface ClientsModuleContextProps {
  paramQuery: string;
  queryClients: UseQueryResult<ResponseApiGetAllRecords<Client>, AxiosError>;
  dataTable: DataTableManualReturn<Client>;
  mutationDeleteClients: UseMutationResult<
    void,
    AxiosError,
    BulkRecords,
    unknown
  >;

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
          pageCount: queryClients.data?.pageCount ?? 0,
          rowCount: queryClients.data?.rowCount ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryClients.data?.rows ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteClients = useDeleteBulkClients();

  const contextValue: ClientsModuleContextProps = {
    paramQuery: value,
    queryClients,
    dataTable,
    mutationDeleteClients,
    actionsClientsModule,
  };

  return (
    <ClientsModuleContext.Provider value={contextValue}>
      {children}
    </ClientsModuleContext.Provider>
  );
};
