import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getEmployeesWithPaymentsPending = async () => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/all`
  );
  return data;
};
