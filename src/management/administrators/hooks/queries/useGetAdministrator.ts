import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';

import { CACHE_CONFIG_TIME } from '@/config';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { Administrator } from '../../interfaces/Administrator';

async function getAdministratorById(
  id: string
): PromiseReturnRecord<Administrator> {
  return await cropcoAPI.get(`${pathsCropco.administrators}/one/${id}`);
}

export function useGetAdministrator(
  id: string
): UseGetOneRecordReturn<Administrator> {
  const { handleError } = useAuthTenantContext();

  const query: UseGetOneRecordReturn<Administrator> = useQuery({
    queryKey: ['user', id],
    queryFn: () => getAdministratorById(id),
    // enabled: isAuthorized,
    select: ({ data }) => ({
      ...data,
    }),
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     toast.error(
  //       'Requieres del permiso de lectura para obtener la información del usuario solicitado'
  //     );
  //   }
  // }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError]);

  return query;
}
