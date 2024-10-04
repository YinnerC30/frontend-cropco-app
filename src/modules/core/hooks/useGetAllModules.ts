import { useQuery } from "@tanstack/react-query";
import { getModules } from "../services/getModules";

export const useGetAllModules = () => {
  const query = useQuery({
    queryKey: ["modules"],
    queryFn: () => getModules(),
  });

  return query;
};
