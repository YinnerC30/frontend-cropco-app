import { DataTableManualReturn } from '@/modules/core/hooks';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { User } from '../User';

export interface UsersModuleContextProps {
  paramQuery: string;
  queryUsers: UseQueryGetAllRecordsReturn<User>;
  dataTable: DataTableManualReturn<User>;
  mutationDeleteUsers: UseMutationReturn<void, BulkRecords>;
  mutationDeleteUser: UseMutationReturn<void, string>;
  actionsUsersModule: Record<string, boolean>;
}
