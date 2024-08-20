import { useQuery } from "@tanstack/react-query";
import { getSaleById } from "../services/getSaleById";

export const useGetSale = (id: string) => {
  const query = useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSaleById(id),
  });
  return query;
};
