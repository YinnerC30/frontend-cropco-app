import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";


import { ResponseGetShopping } from "../interfaces/ResponseGetShopping";
import { getAllShopping } from "../services/getAllShopping";

interface Response {
  query: UseQueryResult<ResponseGetShopping, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function useGetAllShopping(searchParameter: string): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["shoppings", { searchParameter, ...pagination }],
    queryFn: () =>
      getAllShopping({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
}
