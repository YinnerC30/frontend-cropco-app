import { useRoutesManager } from '@/routes/hooks/useRoutesManager';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface HandleErrorProps {
  error: AxiosError;
  messageUnauthoraizedError: string;
}

export const useManageErrorAuthorization = () => {
  const { redirectToLogin } = useRoutesManager();
  const handleError = ({
    error,
    messageUnauthoraizedError,
  }: HandleErrorProps) => {
    const { response } = error;

    switch (response?.status) {
      case 401:
        redirectToLogin();
        toast.error('Su sesión ha expirado, sera redireccionado al Login 😉');
        break;
      case 403:
        toast.error(messageUnauthoraizedError);
        break;
      default:
        toast.error('Ha ocurrido un error desconocido, intentelo nuevamente');
        break;
    }
  };

  return {
    handleError,
  };
};
