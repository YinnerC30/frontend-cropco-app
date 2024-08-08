import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getHarvests } from "../services/getHarvests";

interface Props {
  searchParameter?: string;
  crop?: string;
  after_date?: string;
  before_date?: string;
}

export const useGetAllHarvests = ({
  searchParameter = "",
  crop = "",
  after_date = "",
  before_date = "",
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "harvests",
      { searchParameter, crop, after_date, before_date, ...pagination },
    ],
    queryFn: () =>
      getHarvests({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        crop,
        after_date,
        before_date,
      }),
  });

  return { query, pagination, setPagination };
};
