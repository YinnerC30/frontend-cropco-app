import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Harvest } from '@/interfaces/Harvest';

export const createHarvest = async (harvest: Harvest) =>
  await cropcoAPI.post(`${pathsCropco.harvests}`, harvest);
