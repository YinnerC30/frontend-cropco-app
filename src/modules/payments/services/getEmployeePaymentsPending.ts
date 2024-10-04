import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getEmployeeWithPaymentsPending = async (id: string) => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/one/${id}`
  );
  return data;
};
