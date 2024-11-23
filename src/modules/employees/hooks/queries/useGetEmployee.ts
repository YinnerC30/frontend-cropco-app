import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const getEmployeeById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.employees}/one/${id}`);
  return data;
};

export const useGetEmployee = (id: string) => {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
  });

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
