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

export const getShoppingPDF = async (id: string): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.get<Blob>(
    `${pathsCropco.shopping}/export/one/pdf/${id}`,
    {
      responseType: 'blob',
    }
  );
};

interface Props {
  shoppingId: string;
  stateQuery: boolean;
  actionPDF?: ActionToPDF;
  actionOnSuccess: () => void;
}

export const useGetShoppingPDF = ({
  shoppingId,
  stateQuery,
  actionPDF,
  actionOnSuccess,
}: Props): UseGetOneRecordReturn<Blob> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('shopping', 'export_shopping_to_pdf');

  const query: UseGetOneRecordReturn<Blob> = useQuery({
    queryKey: ['shopping-pdf', shoppingId],
    queryFn: () => {
      const fetchCertification = getShoppingPDF(shoppingId);

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
          viewPDF(query.data);
          break;
        case 'DownloadPDF':
          downloadPDF(query.data, `shopping-document-${shoppingId}`);
          break;
        default:
          break;
      }
      actionOnSuccess();
    }
  }, [query.isSuccess, actionPDF, query.data, actionOnSuccess, shoppingId]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        handlers: {},
      });
    }
  }, [query.isError, query.error]);

  return query;
};
