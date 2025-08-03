import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';

import { Tenant } from '@/auth/interfaces/Tenant';

import { useAuthContext } from '../useAuthContext';
import { toast } from 'sonner';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { CACHE_CONFIG_TIME } from '@/config';

export const getTenantBySubdomain = async (
  subdomain: string
): PromiseReturnRecord<Tenant> => {
  return await cropcoAPI.get(`${pathsCropco.tenants}/one/find/${subdomain}`);
};

export const useGetOneTenant = (
  subdomain: string
): UseGetOneRecordReturn<Tenant> => {
  const { saveTenant } = useAuthContext();

  const query: UseGetOneRecordReturn<Tenant> = useQuery({
    queryKey: ['tenant', subdomain],
    queryFn: () => getTenantBySubdomain(subdomain),
    select: ({ data }) => ({
      ...data,
    }),
    refetchOnWindowFocus: false,
    enabled: true,
    ...CACHE_CONFIG_TIME.longTerm,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      saveTenant(query.data);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      const { error } = query;

      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        toast.error('El servicio actualmente no se encuentra disponible');
        return;
      }
      const { status } = error.response as unknown as TypedAxiosError;
      switch (status) {
        case 401:
          toast.error('No estas autorizado para realizar esta solicitud');
          return;
        case 403:
          toast.error(
            'El acceso al sistema se encuentra desactivado, por favor comuniquese con su adminstrador'
          );
          return;
        case 404:
          toast.error('No se ha encontrado la información del inquilino');
          return;
        case 400:
          toast.error(
            'Las credenciales enviadas son invalidas, revise nuevamente los campos del formulario'
          );
          return;
        default:
          toast.error('Hubo un problema en el sistema, inténtelo nuevamente');
          return;
      }
    }
  }, [query.isError, query.error]);
  return query;
};
