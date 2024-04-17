import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '../interfaces/Supply';

export const getSupplyById = async (id: string): Promise<Supply> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/${id}`);
  return data;
};
