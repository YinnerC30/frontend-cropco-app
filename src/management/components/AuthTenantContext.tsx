import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { useAppDispatch } from '@/redux/store';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useContext } from 'react';
import { AuthTenantContextProps } from '../interfaces/AuthTenantContextProps';
import { TenantAdministrator } from '../interfaces/TenantAdministrator';
import {
  removeUserActive,
  setUserActive,
} from '../utils/authenticationManagementSlice';
import {
  removeTenantManagementInLocalStorage,
  saveTenantManagementInLocalStorage,
} from '../utils/manageTenantManagementInLocalStorage';

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
  const dispatch = useAppDispatch();

  const saveTenantManagement = (tenant: TenantAdministrator) => {
    saveTenantManagementInLocalStorage(tenant);
    dispatch(setUserActive(tenant));
  };

  const removeTenantManagement = () => {
    removeTenantManagementInLocalStorage();
    dispatch(removeUserActive());
  };

  return (
    <AuthTenantContext.Provider
      value={{
        saveTenantManagement,
        removeTenantManagement,
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
