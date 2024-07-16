import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { PurchaseSupplies } from "../interfaces/PurchaseSupplies";

export async function createPurchase(
  purchaseSupplies: PurchaseSupplies
): Promise<PurchaseSupplies> {
  return await cropcoAPI.post(`${pathsCropco.purchase}`, purchaseSupplies);
}
