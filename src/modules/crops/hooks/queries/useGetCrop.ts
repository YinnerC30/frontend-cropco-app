import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Crop } from '../../interfaces/Crop';

export const getCropById = async (id: string): Promise<Crop> => {
  const { data } = await cropcoAPI.get(`${pathsCropco.crops}/one/${id}`);
  return data;
};

export const useGetCrop = (id: string): UseGetOneRecordReturn<Crop> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('crops', 'find_one_crop');

  const query: UseGetOneRecordReturn<Crop> = useQuery({
    queryKey: ['crop', id],
    queryFn: () => getCropById(id),
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
        error: query.error as AxiosError,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);
  return query;
};
