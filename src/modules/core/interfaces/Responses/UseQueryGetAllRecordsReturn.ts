import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseApiGetAllRecords } from './ResponseApiGetAllRecords';

export type UseQueryGetAllRecordsReturn<T> = UseQueryResult<
  ResponseApiGetAllRecords<T>,
  AxiosError<TypedAxiosError, unknown>
>;
