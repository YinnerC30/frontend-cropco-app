import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { CACHE_CONFIG_TIME } from '@/config';
import { downloadPDF } from '@/modules/core/helpers';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getReportClients = async (): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(`${pathsCropco.clients}/export/all/pdf`, {
    responseType: 'blob',
  });
};

interface Props {
  executeQuery: boolean;
  showReport: boolean;
  actionOnSuccess: () => void;
}

export const useGetReportClients = ({
  executeQuery,
  showReport,
  actionOnSuccess,
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('clients', 'export_clients_pdf');
  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['clients-report'],
    queryFn: () => {
      const fetchReportClients = getReportClients();

      toast.promise(fetchReportClients, {
        loading: 'Generando reporte...',
        success: 'El reporte ha sido generado con éxito.',
        error: 'Hubo un error al generar el reporte.',
      });

      return fetchReportClients;
    },
    select: ({ data }) => data,
    enabled: executeQuery && isAuthorized,
    retry: false,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.mediumTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso para generar el reporte de los clientes'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isSuccess && showReport) {
      downloadPDF(query.data, 'reporte-clientes');
      actionOnSuccess();
    }
  }, [query.isSuccess, actionOnSuccess, showReport]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {
          notFound: {
            message: 'No se encontraron registros para generar el reporte.',
          },
        },
      });
    }
  }, [query.isError, query.error]);

  return query;
};
