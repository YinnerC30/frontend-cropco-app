import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { HarvestProcessed } from "@/modules/harvests/interfaces/HarvestProcessed";

export const createHarvestProcessed = async (
  harvestProcessed: HarvestProcessed
) => await cropcoAPI.post(`${pathsCropco.harvestsProcessed}/create`, harvestProcessed);
