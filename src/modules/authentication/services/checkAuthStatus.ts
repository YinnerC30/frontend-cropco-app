import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const checkAuthStatus = async () => {
  const response = await cropcoAPI.post(
    `${pathsCropco.authentication}/check-status`
  );

  return response;
};
