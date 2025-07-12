import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

type StatusKey =
  | 'notFound'
  | 'badRequest'
  | 'forbidden'
  | 'unauthorized'
  | 'conflict'
  | 'TooManyRequests'
  | 'unknown';

export type StatusErrorHandlers = Partial<
  Record<
    StatusKey,
    {
      message?: string;
      onHandle?: (error: AxiosError<TypedAxiosError, unknown>) => void;
    }
  >
>;

export interface UseHandlerErrorProps {
  error: AxiosError<TypedAxiosError, unknown>;
  handlers: StatusErrorHandlers;
}

export const useHandlerError = () => {
  const handleNetworkError = (error: AxiosError<TypedAxiosError, unknown>) => {
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      return true;
    }
    return false;
  };

  const handleErrorByStatus = (props: UseHandlerErrorProps) => {
    const { error, handlers } = props;
    if (handleNetworkError(error)) return;

    const { response } = error;

    switch (response?.status) {
      case 400:
        if (handlers.badRequest?.onHandle) {
          handlers.badRequest.onHandle(error);
        }
        toast.error(
          handlers.badRequest?.message ||
            'La solicitud contiene información incorrecta'
        );
        break;
      case 401:
        if (handlers.unauthorized?.onHandle) {
          handlers.unauthorized.onHandle(error);
        }
        toast.error(
          handlers.unauthorized?.message ||
            'Tu sesión ha terminado, seras redirigido al login'
        );
        break;
      case 403:
        if (handlers.forbidden?.onHandle) {
          handlers.forbidden.onHandle(error);
        }
        toast.error(
          handlers.forbidden?.message ||
            'No tienes permiso para realizar esta acción'
        );
        break;
      case 404:
        if (handlers.notFound?.onHandle) {
          handlers.notFound.onHandle(error);
        }
        toast.error(
          handlers.notFound?.message ||
            'No se encontró la información solicitada'
        );
        break;
      case 409:
        if (handlers.conflict?.onHandle) {
          handlers.conflict.onHandle(error);
        }
        toast.error(
          handlers.conflict?.message ||
            'Existe un conflicto al realizar la solicitud'
        );
        break;
      case 429:
        if (handlers.TooManyRequests?.onHandle) {
          handlers.TooManyRequests.onHandle(error);
        }
        toast.error(
          handlers.TooManyRequests?.message ||
            'Has realizado demasiadas solicitudes al sistema, por favor espera un minuto'
        );
        break;
      default:
        if (handlers.unknown?.onHandle) {
          handlers.unknown.onHandle(error);
        }
        toast.error(handlers.unknown?.message || 'Ocurrió un error inesperado');
        break;
    }
  };

  return { handleErrorByStatus };
};
