import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { renewToken } from '../services/renewToken';
import { useAuthenticationContext } from './useAuthenticationContext';
import { useManageErrorApp } from './useManageErrorApp';

export const useRenewToken = () => {
  const { updateTokenInClient } = useAuthenticationContext();
  const { handleError } = useManageErrorApp();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['user-sesion-status'] });
      updateTokenInClient(data.token);
      toast.success('Tu sesión se ha extendido un poco más 😊');
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      handleError({
        error: loginError,
        messageUnauthoraizedError: 'Su sesión es invalida',
      });
    },
    retry: 0,
  });

  return mutation;
};
