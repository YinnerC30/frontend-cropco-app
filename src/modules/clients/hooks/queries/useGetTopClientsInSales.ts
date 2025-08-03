import { useQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { CACHE_CONFIG_TIME } from '@/config';

interface ClientTopSale {
  id: string;
  first_name: string;
  last_name: string;
  total_value_pay: number;
  total_amount: number;
}

export const getTopClientsInSales = async ({
  year,
}: {
  year: number;
}): TypeGetAllRecordsReturn<ClientTopSale> => {
  const params = new URLSearchParams({
    year: year.toString(),
  });
  return await cropcoAPI.get(
    `${pathsCropco.dashboard}/find/top-clients-in-sales?${params}`
  );
};

export const useGetTopClientsInSales = ({
  year = new Date().getFullYear(),
}: {
  year?: number;
}): UseQueryGetAllRecordsReturn<ClientTopSale> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission(
    'dashboard',
    'find_top_clients_in_sales_chart'
  );

  const query: UseQueryGetAllRecordsReturn<ClientTopSale> = useQuery({
    queryKey: ['clients-top-sales', year],
    queryFn: () => getTopClientsInSales({ year }),
    select: ({ data }) => ({
      ...data,
      records: data.records.map((re) => {
        return { ...re, full_name: re.first_name + ' ' + re.last_name };
      }),
    }),
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.longTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'No tienes permiso para ver el listado del top clientes en ventas '
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
