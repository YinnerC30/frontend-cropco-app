import { AxiosError } from 'axios';

import { toast } from 'sonner';
import { useAuthContext } from './useAuthContext';

interface HandleErrorProps {
  error: AxiosError;
  messageUnauthoraizedError: string;
}

export const useManageErrorApp = () => {
  const { removeUser } = useAuthContext();

  const handleError = ({
    error,
    messageUnauthoraizedError,
  }: HandleErrorProps) => {
    const { response, message, code } = error;

    if (message === 'Network Error' || code === 'ERR_NETWORK') {
      toast.error(
        'El servicio no se encuentra disponible, revise su conexión a internet'
      );
      return;
    }

    switch (response?.status) {
      case 400:
        toast.error('Existe un error en la solicitud');
        return;
      case 401:
        removeUser();
        toast.error('Su sesión ha expirado, volveras al Login 😉');
        return;
      case 403:
        toast.error(messageUnauthoraizedError);
        return;
      case 404:
        toast.error('No se ha encontrado el registro solicitado 🥲');
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
