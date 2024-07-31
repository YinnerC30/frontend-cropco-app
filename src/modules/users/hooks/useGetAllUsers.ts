import { useQuery } from "@tanstack/react-query";

import { ResponseUseGetAllRecords } from "@/modules/core/interfaces/ResponseUseGetAllRecords";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { User } from "../interfaces/User";
import { getUsers } from "../services/getUsers";

export function useGetAllUsers(
  searchParameter: string
): ResponseUseGetAllRecords<User> {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: ["users", { searchParameter, ...pagination }],
    queryFn: () =>
      getUsers({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  return { query, pagination, setPagination };
}
