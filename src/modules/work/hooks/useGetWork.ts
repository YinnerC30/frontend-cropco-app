import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Work } from "../interfaces/Work";
import { getWorkById } from "../services/getWorkById";

export function useGetWork(id: string): UseQueryResult<Work, Error> {
  const query = useQuery({
    queryKey: ["works", id],
    queryFn: () => getWorkById(id),
  });
  return query;
}
