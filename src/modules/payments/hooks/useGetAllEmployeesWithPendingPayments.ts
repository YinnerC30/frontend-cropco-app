import { useQuery } from "@tanstack/react-query";
import { getEmployeesWithPaymentsPending } from "../services/getAllEmployeesWithPaymentsPending";

export const useGetAllEmployeesWithPendingPayments = () => {
  const query = useQuery({
    queryKey: ["employees", "pending-payments"],
    queryFn: () => getEmployeesWithPaymentsPending(),
  });
  return { query };
};
