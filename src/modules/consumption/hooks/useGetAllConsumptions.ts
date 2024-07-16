import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import { ResponseGetConsumptions } from "../interfaces/ResponseGetConsumptions";
import { getAllConsumptions } from "../services/getAllConsumptions";

interface Response {
  query: UseQueryResult<ResponseGetConsumptions, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllConsumptions(searchParameter: string): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["consumptions", { searchParameter, ...pagination }],
    queryFn: () =>
      getAllConsumptions({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
}
