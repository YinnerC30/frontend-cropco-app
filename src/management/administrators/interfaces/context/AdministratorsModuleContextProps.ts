import { DataTableManualReturn } from '@/modules/core/hooks';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { Administrator } from '../Administrator';

export interface AdministratorsModuleContextProps {
  paramQuery: string;
  queryAdministrators: UseQueryGetAllRecordsReturn<Administrator>;
  dataTable: DataTableManualReturn<Administrator>;
  // mutationDeleteAdministrators: UseMutationReturn<void, BulkRecords>;
  mutationDeleteAdministrator: UseMutationReturn<void, string>;
  // actionsAdministratorsModule: Record<string, boolean>;
}
