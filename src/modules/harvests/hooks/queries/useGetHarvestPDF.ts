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
import { ActionToPDF } from '@/modules/core/interfaces/ActionToPDF';

export const getHarvestPDF = async (id: string): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(
    `${pathsCropco.harvests}/export/one/pdf/${id}`,
    {
      responseType: 'blob',
    }
  );
};



interface Props {
  harvestId: string;
  stateQuery: boolean;
  actionPDF?: ActionToPDF;
  actionOnSuccess: () => void;
}

export const useGetHarvestPDF = ({
  harvestId,
  stateQuery,
  actionPDF,
  actionOnSuccess,
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();

  const isAuthorized = hasPermission('harvests', 'export_harvest_to_pdf');

  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['harvest-pdf', harvestId],
    queryFn: () => {
      const fetchCertification = getHarvestPDF(harvestId);

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
    retry: 0,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  useEffect(() => {
    if (query.isSuccess) {
      switch (actionPDF) {
        case 'ViewPDF':
          viewPDF(query.data, `harvest-report-${harvestId}`);
          break;
        case 'DownloadPDF':
          downloadPDF(query.data, `harvest-report-${harvestId}`);
          break;
        default:
          break;
      }
      actionOnSuccess();
    }
  }, [query.isSuccess, actionPDF, query.data, actionOnSuccess, harvestId]);

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
