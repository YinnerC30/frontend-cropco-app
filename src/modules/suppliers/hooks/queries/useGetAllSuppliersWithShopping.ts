import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

import { useAuthContext } from '@/auth/hooks';
import { TypeGetAllRecordsReturn } from '@/modules/core/interfaces/responses/TypeGetAllRecordsReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { toast } from 'sonner';
import { Supplier } from '../../interfaces/Supplier';
import { CACHE_CONFIG_TIME } from '@/config';

export const getSuppliersWithShopping =
  async (): TypeGetAllRecordsReturn<Supplier> => {
    return await cropcoAPI.get(`${pathsCropco.suppliers}/shopping/all`);
  };

export const useGetAllSuppliersWithShopping =
  (): UseQueryGetAllRecordsReturn<Supplier> => {
    const { hasPermission, handleError } = useAuthContext();

    const isAuthorized = hasPermission(
      'suppliers',
      'find_all_suppliers_with_shopping'
    );

    const query: UseQueryGetAllRecordsReturn<Supplier> = useQuery({
      queryKey: ['suppliers-with-shopping'],
      queryFn: () => getSuppliersWithShopping(),
      select: ({ data }) => {
        return {
          ...data,
          records: data.records.map((supl) => {
            return {
              ...supl,
              full_name: supl.first_name + ' ' + supl.last_name,
            };
          }),
        };
      },
      enabled: isAuthorized,
      refetchOnWindowFocus: false,
      ...CACHE_CONFIG_TIME.longTerm,
    });

    useEffect(() => {
      if (!isAuthorized) {
        toast.error(
          'No tienes permiso para ver el listado de proveedores con compras 😑'
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
