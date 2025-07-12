import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { CapitalizeFirstWord } from '@/auth/helpers';
import { LoginUserData } from '@/auth/interfaces';

import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { useFormChange } from '@/modules/core/components';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { User } from '@/modules/users/interfaces';
import { useAuthContext } from '..';
import { useHandlerError } from '../errors/useHandlerError';

export const loginUser = async (
  loginUserData: LoginUserData
): PromiseReturnRecord<User> => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/login`,
    loginUserData
  );
};

export const useLoginUser = (): UseMutationReturn<User, LoginUserData> => {
  const { saveUser } = useAuthContext();

  const queryClient = useQueryClient();
  const { markChanges } = useFormChange();
  const { handleErrorByStatus } = useHandlerError();
  const mutation: UseMutationReturn<User, LoginUserData> = useMutation({
    mutationFn: loginUser,
    onSuccess: async ({ data }) => {
      markChanges(false);
      await queryClient.invalidateQueries({ queryKey: ['user-active'] });
      saveUser({ ...data, is_login: true });
      toast.success(`Bienvenido, ${CapitalizeFirstWord(data.first_name)}`, {});
    },
    onError: (error) => {
      handleErrorByStatus({
        error,
        handlers: {
          unauthorized: {
            message: 'Usuario o contraseña incorrectos, inténtelo nuevamente',
          },
          forbidden: {
            message:
              'El usuario no cuenta con suficientes permisos para acceder al sistema',
          },
          badRequest: {
            message:
              'Las credenciales enviadas son invalidas, revise nuevamente los campos del formulario',
          },
        },
      });
    },
    retry: false,
  });

  return mutation;
};
