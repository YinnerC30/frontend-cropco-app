import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { UseQueryResult } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { ResponseApiGetAllRecords } from './ResponseApiGetAllRecords';

export interface UseGetAllRecordsReturn<T> {
  query: UseQueryResult<
    ResponseApiGetAllRecords<T>,
    AxiosError<TypedAxiosError, unknown>
  >;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
