import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { TIME_ACTIVE_TOKEN } from './useAuthentication';
import { useManageErrorApp } from './useManageErrorApp';

interface Props {
  token: string;
}

export const useCheckAuthStatus = ({ token = '' }: Props) => {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatus(token),
    enabled: token.length > 0,
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
  }, [isError]);

  return query;
};
