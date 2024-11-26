import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const getReportClients = async () => {
  const response = await cropcoAPI.get(
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
}: Props) => {
  const query = useQuery({
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
    enabled: executeQuery,
    staleTime: 60_000 * 60 * 24,
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && showReport) {
      viewPDF(query.data);
      actionOnSuccess();
    }
  }, [query.isSuccess, actionOnSuccess, showReport]);

  return query;
};
