import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { downloadPDF } from '@/modules/core/helpers';
import { viewPDF } from '@/modules/core/helpers/utilities/viewPDF';
import { ActionToPDF } from '@/modules/core/interfaces/ActionToPDF';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { AxiosError } from 'axios';
import { EmployeeCertification } from '../../interfaces/EmployeeCertification';

export const generateCertificationEmployee = async (
  employeeId: string,
  data: EmployeeCertification
): PromiseReturnRecord<Blob> => {
  return await cropcoAPI.post<Blob>(
    `${pathsCropco.employees}/generate/certification/one/${employeeId}`,
    data,
    {
      responseType: 'blob',
    }
  );
};

interface Props {
  actionPDF?: ActionToPDF;
}

export interface MutationVariables {
  employeeId: string;
  data: EmployeeCertification;
}

export const usePostCertificationEmployee = ({
  actionPDF,
}: Props): UseMutationReturn<Blob, MutationVariables> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission(
    'employees',
    'generate_certification_employee'
  );

  const mutation = useMutation({
    mutationFn: async ({ employeeId, data }: MutationVariables) => {
      if (!isAuthorized) {
        throw new Error('No autorizado para generar constancia');
      }
      const promise = generateCertificationEmployee(employeeId, data);
      toast.promise(promise, {
        loading: 'Generando constancia...',
        success: 'La constancia ha sido generada con éxito.',
        error: 'Hubo un error al generar la constancia.',
      });

      return (await promise).data;
    },
    onSuccess: (blob, variables) => {
      switch (actionPDF) {
        case 'ViewPDF':
          viewPDF(blob);
          break;
        case 'DownloadPDF':
          downloadPDF(blob, `constancia-empleado-${variables.employeeId}`);
          break;
        default:
          break;
      }
    },
    onError: (error) => {
      handleError({
        error: error as AxiosError<TypedAxiosError, unknown>,
        handlers: {},
      });
    },
    retry: false,
  }) as any;

  return mutation;
};
