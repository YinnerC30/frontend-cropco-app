import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getClientById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/${id}`);
  return data;
};
