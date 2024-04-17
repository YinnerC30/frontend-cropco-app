import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteHarvest = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.harvests}/${id}`);
