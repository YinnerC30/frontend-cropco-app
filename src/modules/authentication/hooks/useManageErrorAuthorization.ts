import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { AxiosError } from 'axios';

import useAuthentication from './useAuthentication';
import { toast } from 'sonner';

interface HandleErrorProps {
  error: AxiosError;
  messageUnauthoraizedError: string;
}

export const useManageErrorAuthorization = () => {
  const { removeUser } = useAuthentication();
  const { redirectToLogin } = useRoutesManager();
  const handleError = ({
    error,
    messageUnauthoraizedError,
  }: HandleErrorProps) => {
    const { response } = error;

    switch (response?.status) {
      case 401:
        removeUser();
        redirectToLogin();
        toast.error('Su sesión ha expirado, sera redireccionado al Login 😉');
        return;
      case 403:
        toast.error(messageUnauthoraizedError);
        return;

      default:
        toast.error('Ha ocurrido un error desconocido, intentelo nuevamente');
        return;
    }
  };

  return {
    handleError,
  };
};
