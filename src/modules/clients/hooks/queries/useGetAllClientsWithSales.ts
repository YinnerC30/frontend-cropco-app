import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { CACHE_CONFIG_TIME } from '@/config';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Client } from '../../interfaces/Client';

export const getClientsWithSales =
  async (): TypeGetAllRecordsReturn<Client> => {
    return await cropcoAPI.get(`${pathsCropco.clients}/sales/all`);
  };

export const useGetAllClientsWithSales =
  (): UseQueryGetAllRecordsReturn<Client> => {
    const { hasPermission, handleError } = useAuthContext();

    const isAuthorized = hasPermission(
      'clients',
      'find_all_clients_with_sales'
    );
    const query: UseQueryGetAllRecordsReturn<Client> = useQuery({
      queryKey: ['clients-with-sales'],
      queryFn: () => getClientsWithSales(),
      select: ({ data }) => data,
      staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
      enabled: isAuthorized,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'No tienes permiso para ver el listado de clientes con ventas 😑'
        );
      }
    }, [isAuthorized]);

    useEffect(() => {
      if (query.isError) {
        handleError({
          error: query.error,
          messagesStatusError: {},
        });
      }
    }, [query.isError, query.error]);

    return query;
  };
