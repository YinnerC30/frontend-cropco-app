/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState, useAppSelector } from '@/redux/store';
import { createContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useQueryClient } from '@tanstack/react-query';
import { UserActive } from '../interfaces';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';
import {
  removeUserInLocalStorage,
  renewTokenInLocalStorage,
  saveUserInLocalStorage,
} from '../utils/manageUserInLocalStorage';
import { useNavigate } from 'react-router-dom';
import { PATH_LOGIN } from '@/config';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { useGetAllModules } from '@/modules/core/hooks';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;
export const AuthContext = createContext<any>(undefined);

interface HandleErrorProps {
  error: AxiosError;
  messagesStatusError: {
    notFound: string;
    badRequest: string;
    unauthorized: string;
    other: string;
  };
}

interface DataActionsAuthorization {
  [key: string]: {
    actions: Set<string>;
  };
}

export const AuthProvider = ({ children }: any) => {
  const { user } = useAppSelector((state: RootState) => state.authentication);
  const queryClient = useQueryClient();
  const tokenSession = user?.token;
  const dispatch = useDispatch();

  const saveUserInState = (user: UserActive) => {
    dispatch(setUserActive(user));
  };

  const saveUser = (user: UserActive) => {
    saveUserInLocalStorage(user);
    saveUserInState(user);
  };

  const removeUserInState = () => {
    dispatch(removeUserActive());
  };

  const removeUser = () => {
    removeUserInLocalStorage();
    removeUserInState();
    queryClient.clear();
  };

  const updateUserActions = (modules: any) => {
    saveUserInLocalStorage({ ...user, modules });
    saveUserInState({ ...user, modules });
  };

  const renewTokenInState = (token: string) => {
    dispatch(setToken(token));
  };

  const updateTokenInClient = (token: string) => {
    renewTokenInLocalStorage(user, token);
    renewTokenInState(token);
  };

  const handleError = ({ error, messagesStatusError }: HandleErrorProps) => {
    const { response } = error;
    const { badRequest, unauthorized, other, notFound } = messagesStatusError;

    // Función auxiliar para errores de red
    const handleNetworkError = () => {
      if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
        toast.error('No tienes conexión a internet');
        return true;
      }
      return false;
    };

    // Si es un error de red, se maneja aquí
    if (handleNetworkError()) return;

    // Si no es un error de red, manejamos el status
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
      default:
        toast.error(other);
        break;
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate(PATH_LOGIN, { replace: true });
    }
  }, [navigate, user]);

  // Authorization

  const nameModulesUser: string[] = useMemo(() => {
    return user?.modules?.map((module: any) => module?.name) ?? [];
  }, [user]);

  const data: DataActionsAuthorization = useMemo(() => {
    return (
      user?.modules?.reduce((acc: any, module: Module) => {
        acc[module.name] = {
          actions: new Set(
            module?.actions.map((action: Action) => action.name)
          ),
        };
        return acc;
      }, {}) ?? {}
    );
  }, [user]);

  // TODO: Crear objeto de permission global de la app y memorizarlo para evitar llamar metodos a cada rato

  const hasPermission = (moduleName: string, actionName: string): boolean => {
    return data[moduleName]?.actions.has(actionName) ?? false;
  };

  const queryGetAllModules = useGetAllModules();

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
    const userActions = data[moduleName].actions;
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

  const hasMoreThanOnePermission = (moduleName: string) => {
    return data[moduleName]?.actions.size;
  };

  return (
    <AuthContext.Provider
      value={{
        saveUser,
        isLogin: user.isLogin,
        removeUser,
        updateUserActions,
        updateTokenInClient,
        tokenSession,
        user,
        handleError,
        nameModulesUser,
        hasMoreThanOnePermission,
        hasPermission,
        validatePermissionsInModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
