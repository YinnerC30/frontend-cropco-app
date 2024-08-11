import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getCropsWithHarvest } from "../services/getCropsWithHarvest";

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllCropsWithHarvest = ({
  searchParameter,
  allRecords,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["crops-with-harvest", { searchParameter, ...pagination }],
    queryFn: () =>
      getCropsWithHarvest({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
