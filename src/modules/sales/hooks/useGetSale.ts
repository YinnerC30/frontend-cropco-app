import { useQuery } from "@tanstack/react-query";
import { getSaleById } from "../services/getOne";

export const useGetSale = (id: string) => {
  const query = useQuery({
    queryKey: ["crop", id],
    queryFn: () => getSaleById(id),
  });
  return query;
};
