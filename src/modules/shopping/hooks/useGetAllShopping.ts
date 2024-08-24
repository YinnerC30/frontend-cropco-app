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

export function useGetAllShopping({
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
}: any): Response {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "shoppings",
      {
        after_date,
        before_date,
        minor_total,
        major_total,
        ...pagination,
      },
    ],
    queryFn: () =>
      getAllShopping({
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        after_date,
        before_date,
        minor_total,
        major_total,
      }),
  });

  return { query, pagination, setPagination };
}
