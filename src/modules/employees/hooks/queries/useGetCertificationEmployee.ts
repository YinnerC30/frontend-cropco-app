import { useQuery } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { dowloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { useEffect } from 'react';
import { useEmployeesModuleContext } from '../../components/EmployeesModule';

export const getCertificationEmployee = async (id: string) => {
  const response = await cropcoAPI.get(
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
  const query = useQuery({
    queryKey: ['employee-certification', userId],
    queryFn: () => getCertificationEmployee(userId),
    staleTime: 60_000 * 60 * 24,
    enabled: stateQuery,
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
  }, [query.isSuccess]);

  return query;
};
