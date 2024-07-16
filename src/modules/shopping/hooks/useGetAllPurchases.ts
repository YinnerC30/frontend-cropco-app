import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import { getPurchases } from "../services/getAllPurchases";
import { ResponseGetPurchases } from "../interfaces/ResponseGetPurchases";

interface Response {
  query: UseQueryResult<ResponseGetPurchases, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllPurchases(searchParameter: string): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["purchases", { searchParameter, ...pagination }],
    queryFn: () =>
      getPurchases({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
}
