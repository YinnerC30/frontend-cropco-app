import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { LoginUserData } from '../interfaces/LoginUserData';

export const loginUser = async (loginUserData: LoginUserData) => {
  const { data } = await cropcoAPI.post(
    `${pathsCropco.authentication}/login`,
    loginUserData
  );
  return data;
};
