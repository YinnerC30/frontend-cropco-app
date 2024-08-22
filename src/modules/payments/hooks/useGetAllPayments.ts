import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { getPayments } from "../services/getPayments";

export const useGetAllPayments = ({
  searchParameter = "",
  employee = "",
  after_date = "",
  before_date = "",
  filter_by_method_of_payment = false,
  method_of_payment = "",
  minor_total = 0,
  major_total = 0,
}: any) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useQuery({
    queryKey: [
      "payments",
      {
        searchParameter,
        employee,
        after_date,
        before_date,
        filter_by_method_of_payment,
        method_of_payment,
        minor_total,
        major_total,
        ...pagination,
      },
    ],
    queryFn: () =>
      getPayments({
        search: searchParameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
        employee,
        after_date,
        before_date,
        filter_by_method_of_payment,
        method_of_payment,
        minor_total,
        major_total,
      }),
  });

  return { query, pagination, setPagination };
};
