import { DataTableManualReturn } from '@/modules/core/hooks';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responsess/UseQueryGetAllRecordsReturn';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Employee } from './Employee';

export interface EmployeesModuleContextProps {
  paramQuery: string;
  queryEmployees: UseQueryGetAllRecordsReturn<Employee>;
  dataTable: DataTableManualReturn<Employee>;
  mutationDeleteEmployees: UseMutationReturn<void, BulkRecords>;
  actionsEmployeesModule: Record<string, boolean>;
  queryGetCertification: UseQueryResult<Blob, AxiosError>;
  userIdCertification: string;
  setUserIdCertification: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
}
