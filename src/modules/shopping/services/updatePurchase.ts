import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { PurchaseSupplies } from "../interfaces/PurchaseSupplies";

export const updatePurchase = async (purchase: PurchaseSupplies) => {
  const { id, ...rest } = purchase;
  await cropcoAPI.patch(`${pathsCropco.purchase}/${id}`, rest);
};
