import { useQuery } from "@tanstack/react-query";
import { getEmployeeWithPaymentsPending } from "../services/getEmployeePaymentsPending";

export const useGetEmployeePendingPayments = (id: string) => {
  const query = useQuery({
    queryKey: ["employee", "pending-payments", id],
    queryFn: () => getEmployeeWithPaymentsPending(id),
  });
  return query;
};
