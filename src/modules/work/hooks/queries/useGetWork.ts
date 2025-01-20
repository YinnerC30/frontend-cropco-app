import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { CACHE_CONFIG_TIME } from '@/config';
import { ConvertStringToDate } from '@/modules/core/helpers';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Work } from '../../interfaces/Work';

export async function getWorkById(id: string): PromiseReturnRecord<Work> {
  return await cropcoAPI.get(`${pathsCropco.works}/one/${id}`);
}

export function useGetWork(id: string): UseGetOneRecordReturn<Work> {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('works', 'find_one_work');

  const query: UseGetOneRecordReturn<Work> = useQuery({
    queryKey: ['work', id],
    queryFn: () => getWorkById(id),
    select: ({ data }) => {
      return {
        ...data,
        date: ConvertStringToDate(data?.date!),
      } as unknown as Work;
    },
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
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
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
}
