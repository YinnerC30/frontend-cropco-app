import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { checkAuthStatus } from '../services/checkAuthStatus';
import { useAuthentication } from './useAuthentication';

export const useCheckAuthStatus = () => {
  const { removeUser } = useAuthentication();
  const { redirectToLogin } = useRoutesManager();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: checkAuthStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
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
