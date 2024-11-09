import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { TIME_ACTIVE_TOKEN } from './useAuthentication';
import { useManageErrorApp } from './useManageErrorApp';

interface Props {
  token: string;
  executeQuery: boolean;
  onErrorAction: any;
}

export const useCheckAuthStatus = ({
  executeQuery,
  onErrorAction,
  token = '',
}: Props) => {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatus(token),
    enabled: executeQuery && token.length > 1,
    refetchInterval: TIME_ACTIVE_TOKEN,
    retry: 0,
  });

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      const loginError: AxiosError | any = error;
      handleError({
        error: loginError,
        messageUnauthoraizedError: 'Tu token ha expirado',
      });
    }
    return () => onErrorAction();
  }, [isError]);

  return query;
};
