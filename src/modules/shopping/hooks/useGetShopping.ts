import { useQuery } from "@tanstack/react-query";
import { getShoppingById } from "../services/getShoppingById";


export const useGetShopping = (id: string) => {
  const query = useQuery({
    queryKey: ["shoppings", id],
    queryFn: () => getShoppingById(id),
  });
  return query;
};
