import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Sale } from "../interfaces";

export const createSale = async (sale: Sale) =>
  await cropcoAPI.post(`${pathsCropco.sales}`, sale);
