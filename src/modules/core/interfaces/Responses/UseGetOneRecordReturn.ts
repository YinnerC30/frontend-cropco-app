import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export type UseGetOneRecordReturn<T> = UseQueryResult<
  AxiosResponse<T>,
  AxiosError<TypedAxiosError, unknown>
>;
