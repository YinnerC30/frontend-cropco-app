import { useQuery } from "@tanstack/react-query";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getSales } from "../services/getSales";

interface Props {
  searchParameter: string;
  after_date?: string;
  before_date?: string;
  minor_total?: number;
  major_total?: number;
  minor_quantity?: number;
  major_quantity?: number;
  filter_by_is_receivable?: Boolean | boolean;
  is_receivable?: Boolean | boolean;
}

export const useGetAllSales = ({
  searchParameter,
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
  minor_quantity = 0,
  major_quantity = 0,
  filter_by_is_receivable = false,
  is_receivable = false,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "sales",
      {
        searchParameter,
        after_date,
        before_date,
        minor_total,
        major_total,
        minor_quantity,
        major_quantity,
        filter_by_is_receivable,
        is_receivable,
        ...pagination,
      },
    ],
    queryFn: () =>
      getSales({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        after_date,
        before_date,
        minor_total,
        major_total,
        minor_quantity,
        major_quantity,
        filter_by_is_receivable,
        is_receivable,
      }),
  });

  return { query, pagination, setPagination };
};
