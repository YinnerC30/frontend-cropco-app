import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { CACHE_CONFIG_TIME } from '@/config';
import { dowloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';

export const getPaymentPDF = async (id: string): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(
    `${pathsCropco.payments}/export/one/pdf/${id}`,
    {
      responseType: 'blob',
    }
  );
};

type ActionToPDF = 'ViewPDF' | 'DownloadPDf';

interface Props {
  paymentId: string;
  stateQuery: boolean;
  actionPDF?: ActionToPDF;
  actionOnSuccess: () => void;
}

export const useGetPaymentPDF = ({
  paymentId,
  stateQuery,
  actionPDF,
  actionOnSuccess,
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();

  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['payment-pdf', paymentId],
    queryFn: () => {
      const fetchCertification = getPaymentPDF(paymentId);

      // Integrando `toast.promise` directamente en la función.
      toast.promise(fetchCertification, {
        loading: 'Generando documento PDF...',
        success: 'El documento ha sido generado con éxito.',
        error: 'Hubo un error al generar el documento.',
      });

      return fetchCertification;
    },
    staleTime: CACHE_CONFIG_TIME.mediumTerm.staleTime,
    select: ({ data }) => data,
    enabled: stateQuery && hasPermission('payments', 'export_payment_to_pdf'),
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess) {
      switch (actionPDF) {
        case 'ViewPDF':
          viewPDF(query.data);
          break;
        case 'DownloadPDf':
          dowloadPDF(query.data, `payment-document-${paymentId}`);
          break;
        default:
          break;
      }
      actionOnSuccess();
    }
  }, [query.isSuccess, actionPDF, query.data, actionOnSuccess, paymentId]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {
          notFound: 'El documento solicitado no fue encontrado',
          unauthorized: 'No tienes permiso para obtener el documento',
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
