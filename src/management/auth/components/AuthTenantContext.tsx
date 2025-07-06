import {
  useHandlerError,
  UseHandlerErrorProps,
} from '@/auth/hooks/errors/useHandlerError';
import { PATH_ADMIN_LOGIN } from '@/config';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Administrator } from '../interfaces/Administrator';
import { AuthTenantContextProps } from '../interfaces/AuthTenantContextProps';
import {
  removeUserActive,
  setUserActive,
} from '../utils/authenticationManagementSlice';
import { AdministratorLocalStorageManager } from '../utils/AdministratorLocalStorageManager';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;

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

  const saveAdministrator = (tenant: Administrator) => {
    AdministratorLocalStorageManager.saveAdministrator(tenant);
    dispatch(setUserActive(tenant));
  };

  const removeAdministrator = () => {
    AdministratorLocalStorageManager.removeAdministrator();
    dispatch(removeUserActive());
  };

  const { handleErrorByStatus } = useHandlerError();
  const handleError = (props: UseHandlerErrorProps) => {
    handleErrorByStatus({
      ...props,
      handlers: {
        ...props.handlers,
        unauthorized: {
          onHandle: () => {
            setTimeout(() => {
              removeAdministrator();
              window.location.reload();
            }, 3000);
          },
        },
      },
    });
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
        saveAdministrator,
        removeAdministrator,
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
