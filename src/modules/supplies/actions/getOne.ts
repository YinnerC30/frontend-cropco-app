import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getSupplyById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/${id}`);
  return data;
};
