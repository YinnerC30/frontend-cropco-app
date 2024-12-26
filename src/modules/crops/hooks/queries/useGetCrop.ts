import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';
import { ConvertStringToDate } from '@/modules/core/helpers';

export const getCropById = async (id: string): PromiseReturnRecord<Crop> => {
  return await cropcoAPI.get(`${pathsCropco.crops}/one/${id}`);
};

export const useGetCrop = (id: string): UseGetOneRecordReturn<Crop> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('crops', 'find_one_crop');

  const query: UseGetOneRecordReturn<Crop> = useQuery({
    queryKey: ['crop', id],
    queryFn: () => getCropById(id),
    select: ({ data }) => ({
      ...data,
      dates: {
        date_of_creation: ConvertStringToDate(data?.date_of_creation),
        date_of_termination: data?.date_of_termination
          ? ConvertStringToDate(data?.date_of_termination)
          : undefined,
      },
    }),
    enabled: isAuthorized,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del cultivo solicitado'
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
};
