import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { dowloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { AxiosError } from 'axios';
import { CACHE_CONFIG_TIME } from '@/config';

export const getCertificationEmployee = async (id: string): Promise<Blob> => {
  const response = await cropcoAPI.get<Blob>(
    `${pathsCropco.employees}/find/certification/one/${id}`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

type ActionToPDF = 'ViewPDF' | 'DownloadPDf';

interface Props {
  userId: string;
  stateQuery: boolean;
  actionPDF?: ActionToPDF;
  actionOnSuccess: () => void;
}

export const useGetCertificationEmployee = ({
  userId,
  stateQuery,
  actionPDF,
  actionOnSuccess,
}: Props): UseQueryResult<Blob, AxiosError> => {
  const { hasPermission, handleError } = useAuthContext();

  const query: UseQueryResult<Blob, AxiosError> = useQuery({
    queryKey: ['employee-certification', userId],
    queryFn: () => {
      const fetchCertification = getCertificationEmployee(userId);

      // Integrando `toast.promise` directamente en la función.
      toast.promise(fetchCertification, {
        loading: 'Generando constancia...',
        success: 'La constancia ha sido generada con éxito.',
        error: 'Hubo un error al generar la constancia.',
      });

      return fetchCertification;
    },
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
    enabled:
      stateQuery && hasPermission('employees', 'find_certification_employee'),
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess) {
      switch (actionPDF) {
        case 'ViewPDF':
          viewPDF(query.data);
          break;
        case 'DownloadPDf':
          dowloadPDF(query.data, `constancia-empleado-${userId}`);
          break;
        default:
          break;
      }
      actionOnSuccess();
    }
  }, [query.isSuccess, actionPDF, query.data, actionOnSuccess, userId]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messagesStatusError: {
          notFound: 'La constancia solicitada no fue encontrada',
          unauthorized:
            'No tienes permiso para obtener la constancia del empleado',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
