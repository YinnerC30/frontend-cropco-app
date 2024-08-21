import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getCropsWithWork } from "../services/getCropsWithWork";

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllCropsWithWork = ({
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
      getCropsWithWork({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
