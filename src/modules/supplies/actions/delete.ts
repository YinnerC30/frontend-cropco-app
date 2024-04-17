import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteSupply = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.supplies}/${id}`);
