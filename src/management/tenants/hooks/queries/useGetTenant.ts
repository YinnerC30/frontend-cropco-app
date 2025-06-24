import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { CACHE_CONFIG_TIME } from '@/config';
import { useAuthTenantContext } from '@/management/auth/components/AuthTenantContext';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { Tenant } from '../../interfaces/Tenant';

export const getTenantById = async (
  id: string
): PromiseReturnRecord<Tenant> => {
  return await cropcoAPI.get(`${pathsCropco.tenants}/one/${id}`);
};

export const useGetTenant = (id: string): UseGetOneRecordReturn<Tenant> => {
  // const { hasPermission, handleError } = useAuthContext();
  // const isAuthorized = hasPermission('tenants', 'find_one_tenant');
  const { handleError } = useAuthTenantContext();

  const query: UseGetOneRecordReturn<Tenant> = useQuery({
    queryKey: ['tenant', id],
    queryFn: () => getTenantById(id),
    select: ({ data }) => ({
      ...data,
    }),
    enabled: true,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     toast.error(
  //       'Requieres del permiso de lectura para obtener la información del inquilino solicitado'
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
  }, [query.isError, query.error]);
  return query;
};
