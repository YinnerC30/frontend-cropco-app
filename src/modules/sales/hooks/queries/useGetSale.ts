import { useQuery } from "@tanstack/react-query";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getSaleById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.sales}/one/${id}`);
  return data;
};


export const useGetSale = (id: string) => {
  const query = useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSaleById(id),
  });
  return query;
};
