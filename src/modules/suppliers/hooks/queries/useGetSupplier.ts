import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthorization,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const getSupplierById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.suppliers}/one/${id}`);
  return data;
};

export const useGetSupplier = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthorization();
  const query = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById(id),
    enabled: hasPermission('suppliers', 'find_one_supplier'),
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver la información del proveedor 😑',
      });
    }
  }, [query.isError, query.error]);
  return query;
};
