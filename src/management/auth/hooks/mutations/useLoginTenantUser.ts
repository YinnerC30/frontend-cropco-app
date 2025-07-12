import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { CapitalizeFirstWord } from '@/auth/helpers';
import { LoginUserData } from '@/auth/interfaces';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useFormChange } from '@/modules/core/components';

import { Administrator } from '@/management/auth/interfaces/Administrator';
import { useAuthTenantContext } from '../../components/AuthTenantContext';
import { useHandlerError } from '@/auth/hooks/errors/useHandlerError';

export const loginTenantUser = async (
  loginUserData: LoginUserData
): PromiseReturnRecord<Administrator> => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/management/login`,
    loginUserData
  );
};

export const useLoginTenantUser = (): UseMutationReturn<
  Administrator,
  LoginUserData
> => {
  const { saveAdministrator } = useAuthTenantContext();

  const queryClient = useQueryClient();
  const { markChanges } = useFormChange();
  const { handleErrorByStatus } = useHandlerError();
  const mutation: UseMutationReturn<Administrator, LoginUserData> = useMutation(
    {
      mutationFn: loginTenantUser,
      onSuccess: async ({ data }) => {
        markChanges(false);
        await queryClient.invalidateQueries({
          queryKey: ['user-tenant-active'],
        });
        saveAdministrator({ ...data, is_login: true });
        toast.success(
          `Bienvenido, ${CapitalizeFirstWord(data.first_name)}`,
          {}
        );
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
    }
  );

  return mutation;
};
