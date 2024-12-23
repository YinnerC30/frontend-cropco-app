import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext, useManageErrorApp } from '@/auth/hooks';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getReportClients = async (): Promise<Blob> => {
  const response = await cropcoAPI.get<Blob>(
    `${pathsCropco.clients}/export/all/pdf`,
    {
      responseType: 'blob', // Indicamos que la respuesta será un archivo binario (blob)
    }
  );
  return response.data; // Retornamos solo el blob (contenido del PDF)
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
}: Props): UseQueryResult<Blob, AxiosError> => {
  const { handleError } = useManageErrorApp();
  const { hasPermission } = useAuthContext();
  const query: UseQueryResult<Blob, AxiosError> = useQuery({
    queryKey: ['report-clients'],
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
    enabled: executeQuery && hasPermission('clients', 'export_clients_pdf'),
    staleTime: 60_000 * 60 * 24,
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
