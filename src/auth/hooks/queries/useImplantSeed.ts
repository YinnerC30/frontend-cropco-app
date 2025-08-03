import { useQuery } from '@tanstack/react-query';

import { cropcoAPI } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { useAuthContext } from '..';
import { toast } from 'sonner';
import { getEnvironmentVariables } from '@/modules/core/helpers/getEnvironmentVariables';

export const implantSeed = async (): PromiseReturnRecord<void> => {
  return await cropcoAPI.get(`/seed`);
};

export function useImplantSeed(
  isRunningSeed: boolean
): UseGetOneRecordReturn<void> {
  const { handleError } = useAuthContext();
  const query: UseGetOneRecordReturn<void> = useQuery({
    queryKey: ['seed'],
    queryFn: () => {
      const fetchSeed = implantSeed();

      toast.promise(fetchSeed, {
        loading: 'Implantando semilla de datos...',
        success: 'La semilla fue plantada con exito 🌱',
        error: 'Hubo un error al generar la semilla de datos.',
      });

      return fetchSeed;
    },
    enabled:
      isRunningSeed &&
      getEnvironmentVariables().STATUS_PROJECT === 'development',
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
}
