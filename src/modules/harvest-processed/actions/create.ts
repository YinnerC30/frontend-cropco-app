import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '@/modules/harvests/Harvest';

export const createHarvestProcessed = async (
  harvestProcessed: HarvestProcessed,
) => await cropcoAPI.post(`${pathsCropco.harvestsProcessed}`, harvestProcessed);
