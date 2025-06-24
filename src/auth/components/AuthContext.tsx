import { PATH_LOGIN } from '@/config';
import { useGetAllModules } from '@/modules/core/hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { RootState, useAppSelector } from '@/redux/store';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { defaultGlobalActionsUserAdmin } from '../helpers/defaultGlobalActionsUserAdmin';
import { UserActive } from '../interfaces';
import { AuthContextProps } from '../interfaces/AuthContextProps';
import { Tenant } from '../interfaces/Tenant';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';

import { HandleErrorProps } from '../interfaces/HandleErrorProps';
import { TenantLocalStorageManager } from '../utils/TenantLocalStorageManager';
import { UserLocalStorageManager } from '../utils/UserLocalStorageManager';
import { setTenant } from '../utils/tenantSlice';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;
export type ModulesCropco =
  | 'users'
  | 'clients'
  | 'employees'
  | 'crops'
  | 'harvests'
  | 'suppliers'
  | 'supplies'
  | 'works'
  | 'sales'
  | 'payments'
  | 'shopping'
  | 'consumptions'
  | 'dashboard'
  | 'tenants';
type GlobalActionsUser = Record<ModulesCropco, Record<string, boolean>>;

interface DataActionsAuthorization {
  [key: string]: {
    actions: Set<string>;
  };
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [executeQueryModule, setExecuteQueryModule] = useState(false);
  const queryGetAllModules = useGetAllModules({
    executeQuery: executeQueryModule,
  });

  const { user } = useAppSelector((state: RootState) => state.authentication);
  const { tenant } = useAppSelector((state: RootState) => state.tenant);

  const queryClient = useQueryClient();
  const tokenSession = user?.token;
  const tenantId = tenant.id;

  const dispatch = useDispatch();

  const saveTenant = (tenant: Tenant) => {
    TenantLocalStorageManager.saveTenantInLocalStorage(tenant);
    dispatch(setTenant(tenant));
  };
  const saveUser = (user: UserActive) => {
    UserLocalStorageManager.saveUser(user);
    dispatch(setUserActive(user));
  };

  const removeTenant = () => {
    TenantLocalStorageManager.removeTenantInLocalStorage();
    dispatch(removeUserActive());
  };

  const removeUser = () => {
    setExecuteQueryModule(false);
    UserLocalStorageManager.removeUser();
    dispatch(removeUserActive());
    removeTenant();
    queryClient.clear();
  };

  const updateTokenInClient = (token: string) => {
    if (user) {
      UserLocalStorageManager.renewToken(user, token);
      dispatch(setToken(token));
    }
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
        removeUser();
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

  const nameModulesUser: string[] = useMemo(() => {
    return user?.modules?.map((module: Module) => module?.name) ?? [];
  }, [user]);

  const userAuthData: DataActionsAuthorization = useMemo(() => {
    return (
      user?.modules?.reduce((acc: DataActionsAuthorization, module: Module) => {
        acc[module.name] = {
          actions: new Set(
            module?.actions.map((action: Action) => action.name)
          ),
        };
        return acc;
      }, {}) ?? {}
    );
  }, [user]);

  const hasPermission = (moduleName: string, actionName: string): boolean => {
    return userAuthData[moduleName]?.actions.has(actionName) ?? false;
  };

  const getNameActionsModule = (nameModule: string) => {
    const module = queryGetAllModules.data?.find(
      (module: Module) =>
        module.name === nameModule && queryGetAllModules.isSuccess
    );
    return module?.actions.map((action: Action) => action.name) ?? [];
  };

  const validatePermissionsInModule = (
    moduleName: string
  ): Record<string, boolean> => {
    const userActions = userAuthData[moduleName]?.actions ?? new Set();
    const moduleActions = getNameActionsModule(moduleName);

    const finalActions: Record<string, boolean> = moduleActions.reduce(
      (acc: Record<string, boolean>, action: string | undefined | null) => {
        if (action) {
          acc[action] = userActions.has(action);
        }
        return acc;
      },
      {}
    );
    return finalActions;
  };

  const getGlobalActionsUser = (): GlobalActionsUser => {
    if (!!queryGetAllModules && queryGetAllModules.isSuccess) {
      return queryGetAllModules.data?.reduce((acc, module) => {
        acc[module.name] = validatePermissionsInModule(module.name);
        return acc;
      }, {} as any);
    }

    return { ...defaultGlobalActionsUserAdmin };
  };

  const getActionsModule = (
    moduleName: ModulesCropco
  ): Record<string, boolean> => {
    return { ...getGlobalActionsUser()[moduleName] };
  };

  const hasMoreThanOnePermission = (moduleName: string) => {
    return userAuthData[moduleName]?.actions.size ?? 0;
  };

  useEffect(() => {
    if (!user?.is_login) {
      setExecuteQueryModule(false);
      navigate(PATH_LOGIN, { replace: true });
    } else if (user.is_login) {
      setExecuteQueryModule(true);
    }
  }, [navigate, user]);

  return (
    <AuthContext.Provider
      value={{
        saveUser,
        is_login: user?.is_login ?? false,
        removeUser,
        updateTokenInClient,
        tokenSession,
        user,
        handleError,
        nameModulesUser,
        hasMoreThanOnePermission,
        hasPermission,
        validatePermissionsInModule,
        getGlobalActionsUser,
        getActionsModule,
        isLoading: queryGetAllModules.isLoading,
        isError: queryGetAllModules.isError,
        tenantId,
        saveTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
