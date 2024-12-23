import { DataTableManualReturn } from '@/modules/core/hooks';
import {
  ResponseApiGetAllRecords,
  BulkRecords,
} from '@/modules/core/interfaces';
import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Employee } from './Employee';

export interface EmployeesModuleContextProps {
  paramQuery: string;
  queryEmployees: UseQueryResult<
    ResponseApiGetAllRecords<Employee>,
    AxiosError
  >;
  dataTable: DataTableManualReturn<Employee>;
  mutationDeleteEmployees: UseMutationResult<
    void,
    AxiosError,
    BulkRecords,
    unknown
  >;

  actionsEmployeesModule: Record<string, boolean>;
  queryGetCertification: UseQueryResult<Blob, AxiosError>;
  userIdCertification: string;
  setUserIdCertification: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
}
