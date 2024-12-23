import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Employee } from '../../interfaces/Employee';

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.employees}/one/${id}`);
  return data;
};

export const useGetEmployee = (
  id: string
): UseQueryResult<Employee, AxiosError> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_one_employee');

  const query: UseQueryResult<Employee, AxiosError> = useQuery({
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
        messagesStatusError: {
          notFound: 'El empleado solicitado no fue encontrado',
          unauthorized:
            'No tienes permiso para obtener la información del empleado',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
