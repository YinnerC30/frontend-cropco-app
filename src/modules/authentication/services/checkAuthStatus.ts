import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const checkAuthStatus = async () => {
  const response = await cropcoAPI.get(
    `${pathsCropco.authentication}/check-status`
  );
  return response;
};
