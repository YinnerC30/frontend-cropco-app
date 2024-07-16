import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ConsumptionSupplies } from "../interfaces/ConsuptionSupplies";

export const updateConsumption = async (consumption: ConsumptionSupplies) => {
  const { id, ...rest } = consumption;
  await cropcoAPI.patch(`${pathsCropco.consumption}/${id}`, rest);
};
