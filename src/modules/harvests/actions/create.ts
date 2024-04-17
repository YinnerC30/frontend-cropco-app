import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/modules/harvests/Harvest';

export const createHarvest = async (harvest: Harvest) =>
  await cropcoAPI.post(`${pathsCropco.harvests}`, harvest);
