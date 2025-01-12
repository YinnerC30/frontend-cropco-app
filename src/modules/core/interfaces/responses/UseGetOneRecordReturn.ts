import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type UseGetOneRecordReturn<T> = UseQueryResult<
  T,
  AxiosError<TypedAxiosError, unknown>
>;
