import { DataTableManualReturn } from '@/modules/core/hooks';
import {
  ResponseApiGetAllRecords,
  BulkRecords,
} from '@/modules/core/interfaces';
import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { User } from '../User';

export interface UsersModuleContextProps {
  paramQuery: string;
  queryUsers: UseQueryResult<ResponseApiGetAllRecords<User>, AxiosError>;
  dataTable: DataTableManualReturn;
  mutationDeleteUsers: UseMutationResult<
    void,
    AxiosError<unknown, any>,
    BulkRecords,
    unknown
  >;

  actionsUsersModule: Record<string, boolean>;
}
