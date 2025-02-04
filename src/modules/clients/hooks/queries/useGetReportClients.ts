import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext, useManageErrorApp } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { AxiosError } from 'axios';
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
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();
  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['clients-report'],
    queryFn: () => {
      const fetchReportClients = getReportClients();

      // Integrando `toast.promise` directamente en la función.
      toast.promise(fetchReportClients, {
        loading: 'Generando reporte...',
        success: 'El reporte ha sido generado con éxito.',
        error: 'Hubo un error al generar el reporte.',
      });

      return fetchReportClients;
    },
    select: ({ data }) => data,
    enabled: executeQuery && hasPermission('clients', 'export_clients_pdf'),
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && showReport) {
      viewPDF(query.data);
      actionOnSuccess();
    }
  }, [query.isSuccess, actionOnSuccess, showReport]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para obtener el reporte de clientes 😑',
      });
    }
  }, [query.isError, query.error]);

  return query;
};
