import { DataTableManualReturn } from '@/modules/core/hooks';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { User } from '../User';

export interface UsersModuleContextProps {
  paramQuery: string;
  queryUsers: UseQueryGetAllRecordsReturn<User>;
  dataTable: DataTableManualReturn<User>;
  mutationDeleteUsers: UseMutationReturn<void, BulkRecords>;
  actionsUsersModule: Record<string, boolean>;
}
