import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteHarvestProcessed = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.harvestsProcessed}/${id}`);
