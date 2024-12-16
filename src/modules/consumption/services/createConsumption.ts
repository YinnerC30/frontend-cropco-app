import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ConsumptionSupplies } from "../interfaces/ConsuptionSupplies";

export async function createConsumption(
  shoppingSupplies: ConsumptionSupplies
): Promise<ConsumptionSupplies> {
  return await cropcoAPI.post(`${pathsCropco.consumption}`, shoppingSupplies);
}
