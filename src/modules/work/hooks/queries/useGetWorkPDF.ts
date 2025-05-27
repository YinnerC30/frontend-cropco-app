import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { downloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { CACHE_CONFIG_TIME } from '@/config';

export const getWorkPDF = async (id: string): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(
    `${pathsCropco.works}/export/one/pdf/${id}`,
    {
      responseType: 'blob',
    }
  );
};

type ActionToPDF = 'ViewPDF' | 'DownloadPDf';

interface Props {
  workId: string;
  stateQuery: boolean;
  actionPDF?: ActionToPDF;
  actionOnSuccess: () => void;
}

export const useGetWorkPDF = ({
  workId,
  stateQuery,
  actionPDF,
  actionOnSuccess,
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('works', 'export_work_to_pdf');

  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['work-pdf', workId],
    queryFn: () => {
      const fetchCertification = getWorkPDF(workId);

      // Integrando `toast.promise` directamente en la función.
      toast.promise(fetchCertification, {
        loading: 'Generando documento PDF...',
        success: 'El documento ha sido generado con éxito.',
        error: 'Hubo un error al generar el documento.',
      });

      return fetchCertification;
    },
    //
    select: ({ data }) => data,
    enabled: stateQuery && isAuthorized,
    retry: false,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  useEffect(() => {
    if (query.isSuccess) {
      switch (actionPDF) {
        case 'ViewPDF':
          viewPDF(query.data, `work-report-${workId}`);
          break;
        case 'DownloadPDf':
          downloadPDF(query.data, `work-document-${workId}`);
          break;
        default:
          break;
      }
      actionOnSuccess();
    }
  }, [query.isSuccess, actionPDF, query.data, actionOnSuccess, workId]);

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
