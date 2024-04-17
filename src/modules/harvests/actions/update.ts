import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/modules/harvests/Harvest';

export const updateHarvest = async (harvest: Harvest) => {
  const { id, ...rest } = harvest;
  await cropcoAPI.patch(`${pathsCropco.harvests}/${id}`, rest);
};
