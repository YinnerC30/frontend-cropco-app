import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { UseGetOneRecordReturn } from "@/modules/core/interfaces/responses/UseGetOneRecordReturn";
import { toast } from "sonner";
import { WorkTotalInYearData } from "../../interfaces/charts/WorksTotalInYear";
import { CACHE_CONFIG_TIME } from "@/config";
// import { HarvestTotalInYearData } from '../../interfaces/charts/WorksTotalInYear';

interface QueryParams {
  year: number;
  crop: string;
  employee: string;
}

export const getTotalWorksInYear = async ({
  year,
  crop,
  employee,
}: QueryParams): PromiseReturnRecord<WorkTotalInYearData> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });

  if (crop.length > 0) {
    params.append("cropId", crop);
  }
  if (employee.length > 0) {
    params.append("employeeId", employee);
  }

  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/total-work-in-year?${params}`
  );
};

export const useGetTotalWorksInYear = ({
  year = new Date().getFullYear(),
  crop = "",
  employee = "",
}: QueryParams): UseGetOneRecordReturn<WorkTotalInYearData> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    "dashboard",
    "find_total_work_in_year_chart"
  );

  const query: UseGetOneRecordReturn<WorkTotalInYearData> = useQuery({
    queryKey: ["works-value_pay-year", year, crop, employee],
    queryFn: () => getTotalWorksInYear({ year, crop, employee }),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        "No tienes permiso para ver el listado del value_pay de trabajos en el año 😑"
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
