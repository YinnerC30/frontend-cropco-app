import { useQuery } from "@tanstack/react-query";
import { getConsumptionById } from "../services/getConsumptionById";

export const useGetConsumption = (id: string) => {
  const query = useQuery({
    queryKey: ["consumptions", id],
    queryFn: () => getConsumptionById(id),
  });
  return query;
};
