import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '@/modules/harvests/Harvest';

export const updateHarvestProcessed = async (
  harvestProcessed: HarvestProcessed,
) => {
  const { id, ...rest } = harvestProcessed;
  await cropcoAPI.patch(`${pathsCropco.harvestsProcessed}/${id}`, rest);
};