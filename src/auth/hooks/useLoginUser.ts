import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { CapitalizeFirstWord } from '../helpers/CapitalizeFirstWord';
import { loginUser } from '../services/loginUser';
import { useAuthContext } from './useAuthContext';

export const useLoginUser = () => {
  const { saveUser } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-active'] });
      saveUser({ ...data, isLogin: true });
      toast.success(`Bienvenido, ${CapitalizeFirstWord(data.first_name)}`);
    },
    onError: (error: AxiosError | any) => {
      const loginError: AxiosError | any = error;
      const { data, status } = loginError.response;
      console.error(
        `Hubo un problema al intentar iniciar sesión, ${data.message}`
      );

      if (status === 401) {
        toast.error('Usuario o contraseña incorrectos, intentelo nuevamente');
      } else if (status === 400) {
        toast.error(
          'Las credenciales enviadas son invalidas, revise nuevamente los campos del formulario'
        );
      } else {
        toast.error('Hubo un problema en el sistema, intentelo nuevamente');
      }
    },
    retry: 1,
  });

  return mutation;
};