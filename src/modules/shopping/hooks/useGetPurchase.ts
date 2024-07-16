import { useQuery } from "@tanstack/react-query";
import { getPurchaseById } from "../services/getPurchaseById";

export const useGetPurchase = (id: string) => {
  const query = useQuery({
    queryKey: ["purchases", id],
    queryFn: () => getPurchaseById(id),
  });
  return query;
};
