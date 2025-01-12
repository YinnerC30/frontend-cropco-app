import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export type UseMutationReturn<TData, TVariables> = UseMutationResult<
  AxiosResponse<TData>,
  AxiosError<TypedAxiosError, unknown>,
  TVariables
>;
