import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface Props {
  error: AxiosError;
  messageUnauthoraizedError: string;
}
export const manageErrorAuthorization = ({
  error,
  messageUnauthoraizedError,
}: Props) => {
  const { response } = error;

  switch (response?.status) {
    case 401:
      toast.error('Su sesión ha expirado, sera redireccionado al Login 😉');
      break;
    case 403:
      toast.error(messageUnauthoraizedError);
      break;
    default:
      toast.error('Ha ocurrido un error inesperado, intentelo nuevamente');
      break;
  }
};
