import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { useAuthentication } from './useAuthentication';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useRoutesManager } from '@/routes/hooks/useRoutesManager';

export const useCheckAuthStatus = () => {
  const { pathname } = useLocation();

  const { removeUser } = useAuthentication();
  const { redirectToHome, redirectToLogin } = useRoutesManager();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: checkAuthStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      if (pathname === '/app') {
        redirectToHome();
      }
      toast.success('El token es valido 😁');
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      const { data } = loginError.response;
      console.error(
        `Hubo un problema al intentar verificar la  sesión, ${data.message}`
      );
      removeUser();
      redirectToLogin();
      toast.error('Tu sesión ha expirado 😢');
    },
    retry: 0,
  });

  return mutation;
};
