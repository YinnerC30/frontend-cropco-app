import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { PATH_ADMIN_LOGIN } from '@/config';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Administrator } from '../interfaces/Administrator';
import { AuthTenantContextProps } from '../interfaces/AuthTenantContextProps';
import {
  removeUserActive,
  setUserActive,
} from '../utils/authenticationManagementSlice';
import { TenantManagementLocalStorageManager } from '../utils/TenantManagementLocalStorageManager';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;

export interface HandleErrorProps {
  error: AxiosError<TypedAxiosError, unknown>;
  messagesStatusError: {
    notFound?: string;
    badRequest?: string;
    unauthorized?: string;
    conflict?: string;
    other?: string;
  };
}

export const AuthTenantContext = createContext<
  AuthTenantContextProps | undefined
>(undefined);

export const AuthTenantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAppSelector(
    (state: RootState) => state.authenticationManagement
  );
  const tokenSession = user?.token;
  const dispatch = useAppDispatch();

  const saveTenantManagement = (tenant: Administrator) => {
    TenantManagementLocalStorageManager.saveTenantManagement(tenant);
    dispatch(setUserActive(tenant));
  };

  const removeTenantManagement = () => {
    TenantManagementLocalStorageManager.removeTenantManagement();
    dispatch(removeUserActive());
  };

  const handleError = ({ error, messagesStatusError }: HandleErrorProps) => {
    const { response } = error;
    const {
      badRequest = 'La solicitud contiene información incorrecta',
      unauthorized = 'No tienes permiso para realizar esta acción',
      other = 'Ocurrió un error inesperado',
      notFound = 'No se encontró la información solicitada',
      conflict = 'Existe un conflicto al realizar la solicitud',
    } = messagesStatusError;

    const handleNetworkError = () => {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        toast.error('El servicio actualmente no se encuentra disponible');
        return true;
      }
      return false;
    };

    if (handleNetworkError()) return;

    switch (response?.status) {
      case 400:
        toast.error(badRequest);
        break;
      case 401:
        removeTenantManagement();
        toast.error('Su sesión ha expirado, volveras al Login 😉');
        break;
      case 403:
        toast.error(unauthorized);
        break;
      case 404:
        toast.error(notFound);
        break;
      case 409:
        toast.error(conflict);
        break;
      default:
        toast.error(other);
        break;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.is_login) {
      navigate(PATH_ADMIN_LOGIN, { replace: true });
    }
  }, [navigate, user]);

  return (
    <AuthTenantContext.Provider
      value={{
        saveTenantManagement,
        removeTenantManagement,
        is_login: user?.is_login ?? false,
        user,
        handleError,
        tokenSession,
      }}
    >
      {children}
    </AuthTenantContext.Provider>
  );
};

export default AuthTenantProvider;

export const useAuthTenantContext = (): AuthTenantContextProps => {
  const context = useContext(AuthTenantContext);
  if (!context) {
    throw new Error(
      'useAuthTenantContext must be used within a AuthTenantProvider'
    );
  }
  return context;
};
