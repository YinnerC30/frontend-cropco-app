import { DataTableManualReturn } from '@/modules/core/hooks';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { MutationVariables } from '../hooks/mutations/usePostCertificationEmployee';
import { Employee } from './Employee';

export interface EmployeesModuleContextProps {
  paramQuery: string;
  queryEmployees: UseQueryGetAllRecordsReturn<Employee>;
  dataTable: DataTableManualReturn<Employee>;
  mutationDeleteEmployees: UseMutationReturn<
    UseDeleteBulkResponse,
    BulkRecords
  >;
  mutationDeleteEmployee: UseMutationReturn<void, string>;
  mutationGenerateCertification: UseMutationReturn<Blob, MutationVariables>;
  actionsEmployeesModule: Record<string, boolean>;

  userIdCertification: string;
  setUserIdCertification: React.Dispatch<React.SetStateAction<string>>;
}
