import { useMutation } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const logoutAdministrator = async (): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/management/logout`
  );
};

export const useLogoutAdministrator = (): UseMutationReturn<void, void> => {
  const mutation: UseMutationReturn<void, void> = useMutation({
    mutationFn: logoutAdministrator,
    retry: false,
  });

  return mutation;
};
