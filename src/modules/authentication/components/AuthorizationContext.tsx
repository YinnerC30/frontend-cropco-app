import { createContext, useContext, useMemo } from 'react';
import { useAuthentication } from '../hooks';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';

export const AuthorizationContext = createContext<any>(undefined);

interface DataActionsAuthorization {
  [key: string]: {
    actions: Set<string>;
  };
}

export const AuthorizationProvider = ({ children }: any) => {
  const { getModuleActions, user } = useAuthentication();

  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

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

  const hasPermission = (moduleName: string, actionName: string): boolean => {
    return data[moduleName]?.actions.has(actionName) ?? false;
  };

  const hasMoreThanOnePermission = (moduleName: string) => {
    const actions = getModuleActions(moduleName);
    return actions.length;
  };

  return (
    <AuthorizationContext.Provider
      value={{
        modulesUser,
        hasPermission,
        hasMoreThanOnePermission,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
