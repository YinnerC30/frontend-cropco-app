import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { HarvestProcessed } from "@/modules/harvests/interfaces/HarvestProcessed";

export const getHarvestProcessedById = async (
  id: string
): Promise<HarvestProcessed> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsProcessed}/${id}`
  );
  return data;
};
