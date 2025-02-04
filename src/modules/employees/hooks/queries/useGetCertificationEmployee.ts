import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { dowloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';

export const getCertificationEmployee = async (
  id: string
): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(
    `${pathsCropco.employees}/find/certification/one/${id}`,
    {
      responseType: 'blob',
    }
  );
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
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();

  const query: UseGetOneRecordReturn<Blob> = useQuery({
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
    
    select: ({ data }) => data,
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
        error: query.error,
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
