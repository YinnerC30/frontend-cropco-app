import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getAllSuppliesStock } from "../services/getAllSuppliesStock";

interface Props {
  searchParameter: string;
  allRecords: boolean;
}

export const useGetAllSuppliesStock = ({
  searchParameter,
  allRecords,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["supplies", { searchParameter, ...pagination }],
    queryFn: () =>
      getAllSuppliesStock({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        allRecords,
      }),
  });

  return { query, pagination, setPagination };
};
