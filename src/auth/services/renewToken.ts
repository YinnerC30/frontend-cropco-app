import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const renewToken = async () => {
  return await cropcoAPI.patch(`${pathsCropco.authentication}/renew-token`);
};
