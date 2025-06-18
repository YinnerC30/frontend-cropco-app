import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { CapitalizeFirstWord } from '@/auth/helpers';
import { LoginUserData } from '@/auth/interfaces';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { User } from '@/modules/users/interfaces';
// import { useAuthContext } from '..';
import { useFormChange } from '@/modules/core/components';

export const loginTenantUser = async (
  loginUserData: LoginUserData
): PromiseReturnRecord<User> => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/management/login`,
    loginUserData
  );
};

export const useLoginTenantUser = (): UseMutationReturn<
  User,
  LoginUserData
> => {
  // const { saveUser } = useAuthTenantContext();

  const queryClient = useQueryClient();
  const { markChanges } = useFormChange();
  const mutation: UseMutationReturn<User, LoginUserData> = useMutation({
    mutationFn: loginTenantUser,
    onSuccess: async ({ data }) => {
      markChanges(false);
      await queryClient.invalidateQueries({ queryKey: ['user-tenant-active'] });
      // saveUser({ ...data, isLogin: true });
      toast.success(`Bienvenido, ${CapitalizeFirstWord(data.first_name)}`, {});
    },
    onError: (error) => {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        toast.error('El servicio actualmente no se encuentra disponible');
        return;
      }
      const { status } = error.response as unknown as TypedAxiosError;
      switch (status) {
        case 401:
          toast.error('Usuario o contraseña incorrectos, inténtelo nuevamente');
          return;
        case 403:
          toast.error(
            'El usuario no cuenta con suficientes permisos para acceder al sistema'
          );
          return;
        case 400:
          toast.error(
            'Las credenciales enviadas son invalidas, revise nuevamente los campos del formulario'
          );
          return;
        default:
          toast.error('Hubo un problema en el sistema, inténtelo nuevamente');
          return;
      }
    },
    retry: false,
  });

  return mutation;
};
