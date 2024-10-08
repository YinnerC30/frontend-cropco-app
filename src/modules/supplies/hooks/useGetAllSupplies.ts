import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getSupplies } from "../services/getSupplies";

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllSupplies = ({ searchParameter, allRecords }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["supplies", { searchParameter, ...pagination }],
    queryFn: () =>
      getSupplies({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
