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
import {
  removeUserActive,
  setUserActive,
  UserLocalStorageManager,
} from '../utils';
import { setToken } from '../utils/authenticationSlice';

import { createCookieManager, getCookieDomain } from '@/lib/cookieManager';
import Cookies from 'js-cookie';
import {
  useHandlerError,
  UseHandlerErrorProps,
} from '../hooks/errors/useHandlerError';
import { TenantLocalStorageManager } from '../utils/TenantLocalStorageManager';
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
  | 'dashboard';

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

  const { user } = useAppSelector((state: RootState) => state.authentication);
  const { tenant } = useAppSelector((state: RootState) => state.tenant);

  // const userTokenCookieManager = createCookieManager('user-token', {}, {});

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
    // userTokenCookieManager.save(user.token);
    dispatch(setUserActive(user));
  };

  const removeTenant = () => {
    TenantLocalStorageManager.removeTenantInLocalStorage();
    dispatch(removeUserActive());
  };

  // Función helper para eliminar cookies de manera consistente
  // const removeCookieWithOptions = (cookieName: string) => {
  //   const cookieOptions = {
  //     path: '/',
  //     domain: getCookieDomain(),
  //   };
  //   Cookies.remove(cookieName, cookieOptions);
  // };

  const removeUser = () => {
    // Eliminar la cookie con las mismas opciones que se usaron al crearla
    // removeCookieWithOptions('user-token');
    setExecuteQueryModule(false);
    UserLocalStorageManager.removeUser();
    dispatch(removeUserActive());
    removeTenant();
    queryClient.clear();
  };

  const queryGetAllModules = useGetAllModules({
    executeQuery: executeQueryModule,
    actionOnError: () => {
      setTimeout(() => {
        removeUser();
        window.location.reload();
      }, 3000);
    },
  });

  const updateTokenInClient = (token: string) => {
    if (user) {
      UserLocalStorageManager.renewToken(user, token);
      dispatch(setToken(token));
    }
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
              removeUser();
              window.location.reload();
            }, 3000);
          },
        },
      },
    });
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

  const hasPermission = (
    moduleName: string,
    actionName: string,
    showToastError = false,
    messageError = 'No tienes permisos para esta acción'
  ): boolean => {
    const isAuthorized =
      userAuthData[moduleName]?.actions.has(actionName) ?? false;
    if (!isAuthorized && showToastError) {
      toast.error(messageError);
    }
    return isAuthorized;
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
