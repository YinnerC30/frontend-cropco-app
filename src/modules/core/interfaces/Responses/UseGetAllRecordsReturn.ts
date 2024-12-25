import { UseQueryResult } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseApiGetAllRecords } from './ResponseApiGetAllRecords';

export interface UseGetAllRecordsReturn<T> {
  query: UseQueryResult<AxiosResponse<ResponseApiGetAllRecords<T>>, AxiosError>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
