import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { type Sale } from "../interfaces";

export const updateSale = async (sale: Sale) => {
  const { id, ...rest } = sale;
  await cropcoAPI.patch(`${pathsCropco.sales}/update/one/${id}`, rest);
};
