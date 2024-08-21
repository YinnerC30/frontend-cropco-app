import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getWorks } from "../services/getWorks";

interface Props {
  searchParameter: string;
  crop?: string;
  after_date?: string;
  before_date?: string;
  minor_total?: number;
  major_total?: number;
}

export const useGetAllWorks = ({
  searchParameter,
  crop = "",
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "works",
      {
        searchParameter,
        crop,
        after_date,
        before_date,
        minor_total,
        major_total,
        ...pagination,
      },
    ],
    queryFn: () =>
      getWorks({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        crop,
        after_date,
        before_date,
        minor_total,
        major_total,
      }),
  });

  return { query, pagination, setPagination };
};
