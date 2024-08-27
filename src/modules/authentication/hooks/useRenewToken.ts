import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { renewToken } from "../services/renewToken";

export function useRenewToken(token: string): UseQueryResult<any, Error> {
  const query = useQuery({
    queryKey: ["renew-token"],
    queryFn: () => renewToken(token),
  });
  return query;
}
