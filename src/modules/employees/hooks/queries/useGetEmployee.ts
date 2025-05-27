import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Employee } from '../../interfaces/Employee';
import { CACHE_CONFIG_TIME } from '@/config';

export const getEmployeeById = async (
  id: string
): PromiseReturnRecord<Employee> => {
  return await cropcoAPI.get(`${pathsCropco.employees}/one/${id}`);
};

export const useGetEmployee = (id: string): UseGetOneRecordReturn<Employee> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('employees', 'find_one_employee');

  const query: UseGetOneRecordReturn<Employee> = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
    select: ({ data }) => data,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
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
        error: query.error,
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
