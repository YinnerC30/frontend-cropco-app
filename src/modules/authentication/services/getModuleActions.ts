import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getModuleActions = async (name: string) => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/one/${name}`
  );
  return data;
};
