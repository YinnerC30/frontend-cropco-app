import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Supply } from '../../interfaces/Supply';

export const getSupplyById = async (
  id: string
): PromiseReturnRecord<Supply> => {
  return await cropcoAPI.get(`${pathsCropco.supplies}/one/${id}`);
};

export const useGetSupply = (id: string): UseGetOneRecordReturn<Supply> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('supplies', 'find_one_supply');

  const query: UseGetOneRecordReturn<Supply> = useQuery({
    queryKey: ['supply', id],
    queryFn: () => getSupplyById(id),
    select: ({ data }) => data,
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del suministro solicitado'
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
