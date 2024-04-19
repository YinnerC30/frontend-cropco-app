import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/modules/harvests/interfaces/Harvest';

export const createHarvest = async (harvest: Harvest) =>
  await cropcoAPI.post(`${pathsCropco.harvests}`, harvest);
