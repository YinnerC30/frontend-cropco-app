import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { CapitalizeFirstWord } from '@/auth/helpers';
import { LoginUserData } from '@/auth/interfaces';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { User } from '@/modules/users/interfaces';
import { useAuthContext } from '..';

export const loginUser = async (
  loginUserData: LoginUserData
): Promise<AxiosResponse<User>> => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/login`,
    loginUserData
  );
};

export const useLoginUser = (): UseMutationResult<
  AxiosResponse<User>,
  AxiosError<TypedAxiosError, unknown>,
  LoginUserData,
  unknown
> => {
  const { saveUser } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationResult<
    AxiosResponse<User>,
    AxiosError<TypedAxiosError, unknown>,
    LoginUserData,
    unknown
  > = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['user-active'] });
      saveUser({ ...data, isLogin: true });
      toast.success(`Bienvenido, ${CapitalizeFirstWord(data.first_name)}`);
    },
    onError: (error) => {
      const { status } = error.response as unknown as TypedAxiosError;
      switch (status) {
        case 401:
          toast.error('Usuario o contraseña incorrectos, intentelo nuevamente');
          return;
        case 400:
          toast.error(
            'Las credenciales enviadas son invalidas, revise nuevamente los campos del formulario'
          );
          return;
        default:
          toast.error('Hubo un problema en el sistema, intentelo nuevamente');
          return;
      }
    },
    retry: 1,
  });

  return mutation;
};
