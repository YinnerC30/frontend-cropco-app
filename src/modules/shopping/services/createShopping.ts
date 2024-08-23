import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ShoppingSupplies } from "../interfaces/ShoppingSupplies";

export async function createShopping(
  shoppingSupplies: ShoppingSupplies
): Promise<ShoppingSupplies> {
  return await cropcoAPI.post(`${pathsCropco.purchase}`, shoppingSupplies);
}
