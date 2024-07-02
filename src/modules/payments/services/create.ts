import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Payment } from "../interfaces/Payment";

export const createPayment = async (payment: Payment) =>
  await cropcoAPI.post(`${pathsCropco.payments}`, payment);
