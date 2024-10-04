import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ShoppingSupplies } from "../interfaces/ShoppingSupplies";

export const updateShopping = async (shopping: ShoppingSupplies) => {
  const { id, ...rest } = shopping;
  await cropcoAPI.patch(`${pathsCropco.purchase}/update/one/${id}`, rest);
};
