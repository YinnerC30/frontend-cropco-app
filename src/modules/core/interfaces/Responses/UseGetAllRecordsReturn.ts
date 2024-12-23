import { UseQueryResult } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { ResponseApiGetAllRecords } from './ResponseApiGetAllRecords';
import { AxiosError } from 'axios';

export interface UseGetAllRecordsReturn<T> {
  query: UseQueryResult<ResponseApiGetAllRecords<T>, AxiosError>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
