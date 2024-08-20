import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getWorks } from "../services/getWorks";

interface Props {
  searchParameter: string;
}

export const useGetAllWorks = ({ searchParameter }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["works", { searchParameter, ...pagination }],
    queryFn: () =>
      getWorks({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
};
