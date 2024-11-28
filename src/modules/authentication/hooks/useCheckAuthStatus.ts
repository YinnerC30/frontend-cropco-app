import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { checkAuthStatus } from '../services/checkAuthStatus';

import { useManageErrorApp } from './useManageErrorApp';
import { TIME_ACTIVE_TOKEN } from '../components/AuthenticationContext';
import { useAuthenticationContext } from '.';

interface Props {
  token: string;
}

export const useCheckAuthStatus = ({ token = '' }: Props) => {
  const { handleError } = useManageErrorApp();
  const { isLogin } = useAuthenticationContext();
  const query = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: () => checkAuthStatus(token),
    enabled: isLogin,
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
