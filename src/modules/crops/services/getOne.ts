import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getCropById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.crops}/${id}`);
  return data;
};
