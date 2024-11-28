import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { renewToken } from '../services/renewToken';
import { useAuthContext } from './useAuthContext';
import { useManageErrorApp } from './useManageErrorApp';

export const useRenewToken = () => {
  const { updateTokenInClient } = useAuthContext();
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
