import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthContext,
  useManageErrorApp,
} from '@/auth/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getSupplierById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.suppliers}/one/${id}`);
  return data;
};

export const useGetSupplier = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('suppliers', 'find_one_supplier');

  const query = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById(id),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del usuario solicitado'
      );
    }
  }, [isAuthorized]);

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
