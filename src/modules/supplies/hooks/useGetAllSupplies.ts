import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getSupplies } from "../services/getAll";

// interface Response {
//   query: UseQueryResult<ResponseGetSupplies, Error>;
//   pagination: PaginationState;
//   setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
// }

export const useGetAllSupplies = (searchParameter: string) => {
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
      }),
  });

  return { query, pagination, setPagination };
};
