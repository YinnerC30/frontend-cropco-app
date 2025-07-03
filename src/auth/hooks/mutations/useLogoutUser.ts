import { useMutation } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

export const logoutUser = async (): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.authentication}/logout`);
};

export const useLogoutUser = (): UseMutationReturn<void, void> => {
  const mutation: UseMutationReturn<void, void> = useMutation({
    mutationFn: logoutUser,
    retry: false,
  });

  return mutation;
};
