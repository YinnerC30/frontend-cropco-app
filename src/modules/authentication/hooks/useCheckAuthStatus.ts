import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { useAuthenticationUser } from './useAuthenticationUser';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export const useCheckAuthStatus = () => {
  const { pathname } = useLocation();
  const { LogOutUser, redirectToHome } = useAuthenticationUser();
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
      LogOutUser();
      toast.error('Tu sesión ha expirado 😢');
    },
    retry: 0,
  });

  return mutation;
};
