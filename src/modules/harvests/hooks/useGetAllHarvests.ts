import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getHarvests } from "../services/getHarvests";

interface Props {
  searchParameter?: string;
  crop?: string;
  after_date?: string;
  before_date?: string;
  minor_total?: number;
  major_total?: number;
  minor_value_pay?: number;
  major_value_pay?: number;
}

export const useGetAllHarvests = ({
  searchParameter = "",
  crop = "",
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
  minor_value_pay = 0,
  major_value_pay = 0,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "harvests",
      {
        searchParameter,
        crop,
        after_date,
        before_date,
        minor_total,
        major_total,
        minor_value_pay,
        major_value_pay,
        ...pagination,
      },
    ],
    queryFn: () =>
      getHarvests({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        crop,
        after_date,
        before_date,
        minor_total,
        major_total,
        minor_value_pay,
        major_value_pay
      }),
  });

  return { query, pagination, setPagination };
};
