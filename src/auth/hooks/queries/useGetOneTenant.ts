import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';

import { Tenant } from '@/auth/interfaces/Tenant';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../useAuthContext';

export const getTenantBySubdomain = async (
  subdomain: string
): PromiseReturnRecord<Tenant> => {
  return await cropcoAPI.get(`${pathsCropco.tenants}/one/find/${subdomain}`);
};

export const useGetOneTenant = (
  subdomain: string
): UseGetOneRecordReturn<Tenant> => {
  const { saveTenant } = useAuthContext();
  const navigate = useNavigate();
  //   const isAuthorized = hasPermission('crops', 'find_one_crop');

  const query: UseGetOneRecordReturn<Tenant> = useQuery({
    queryKey: ['tenant', subdomain],
    queryFn: () => getTenantBySubdomain(subdomain),
    select: ({ data }) => ({
      ...data,
    }),
    // enabled: isAuthorized,
    refetchOnWindowFocus: false,
    retry: false,
    // ...CACHE_CONFIG_TIME.shortTerm,
  });

  //   useEffect(() => {
  //     if (!isAuthorized) {
  //       toast.error(
  //         'Requieres del permiso de lectura para obtener la información del cultivo solicitado'
  //       );
  //     }
  //   }, [isAuthorized]);

  useEffect(() => {
    if (query.isSuccess) {
      saveTenant(query.data);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      //   console.error('Hubo un error', error);
      navigate('/');
      //   handleError({
      //     error: query.error,
      //     messagesStatusError: {},
      //   });
    }
  }, [query.isError, query.error]);
  return query;
};
