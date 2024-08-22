import { useQuery } from "@tanstack/react-query";
import { getPaymentById } from "../services/getPaymentById";

export const useGetPayment = (id: string) => {
  const query = useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPaymentById(id),
  });
  return query;
};
