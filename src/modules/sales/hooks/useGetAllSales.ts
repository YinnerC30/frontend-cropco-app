import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getSales } from "../services/getAll";

interface Props {
  searchParameter: string;
}

export const useGetAllSales = ({ searchParameter }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["sales", { searchParameter, ...pagination }],
    queryFn: () =>
      getSales({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
