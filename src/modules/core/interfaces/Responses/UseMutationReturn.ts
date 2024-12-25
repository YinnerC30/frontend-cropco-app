import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type UseMutationReturn<TData, TVariables> = UseMutationResult<
  TData,
  AxiosError,
  TVariables
>;
