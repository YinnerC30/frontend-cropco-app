import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../services/getSuppliers";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export const useGetAllSuppliers = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["suppliers", { searchParameter, ...pagination }],
    queryFn: () =>
      getSuppliers({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
