import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getHarvestStock } from "../services/getAllHarvestStock";

export const useGetAllHarvestsStock = (searchParameter: string) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["harvests_stock", { searchParameter, ...pagination }],
    queryFn: () =>
      getHarvestStock({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
