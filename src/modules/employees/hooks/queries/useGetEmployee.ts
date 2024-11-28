import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import {
  useAuthContext,
  useManageErrorApp,
} from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getEmployeeById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.employees}/one/${id}`);
  return data;
};

export const useGetEmployee = (id: string) => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_one_employee');

  const query = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del empleado solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para ver la información del empleado 😑',
      });
    }
  }, [query.isError, query.error]);

  return query;
};
