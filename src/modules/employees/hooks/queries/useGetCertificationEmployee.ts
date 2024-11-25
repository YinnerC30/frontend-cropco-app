import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { dowloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { AxiosError } from 'axios';

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
}: Props) => {
  const { handleError } = useManageErrorApp();
  const query = useQuery({
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
    staleTime: 60_000 * 60 * 24,
    enabled: stateQuery,
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
        messageUnauthoraizedError:
          'No tienes permiso para obtener el certificado 😑',
      });
    }
  }, [query.isError, query.error]);

  return query;
};
