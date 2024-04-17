import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/interfaces/Harvest';

export const updateHarvest = async (harvest: Harvest) => {
  const { id, ...rest } = harvest;
  await cropcoAPI.patch(`${pathsCropco.harvests}/${id}`, rest);
};
