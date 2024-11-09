import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { TIME_ACTIVE_TOKEN, useAuthentication } from './useAuthentication';

interface Props {
  executeQuery: boolean;
  onErrorAction: any;
}

export const useCheckAuthStatus = ({ executeQuery, onErrorAction }: Props) => {
  const { removeUser } = useAuthentication();
  const { redirectToLogin } = useRoutesManager();

  const query = useQuery({
    queryKey: ['valid-sesion-user'],
    queryFn: checkAuthStatus,
    enabled: executeQuery,
    refetchInterval: TIME_ACTIVE_TOKEN,
    retry: 2,
  });

  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar verificar la  sesión, ${data.message}`
      );
      toast.error('Tu sesión ha expirado 😢');
    }
    return () => {
      onErrorAction();
      redirectToLogin();
      removeUser();
    };
  }, [isError]);

  return query;
};
