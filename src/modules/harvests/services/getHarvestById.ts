import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getHarvestById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.harvests}/one/${id}`);
  return data;
};
