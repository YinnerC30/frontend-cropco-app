import {
  Action,
  Module,
} from '@/modules/core/interfaces/responses/ResponseGetAllModules';
import { createContext, useMemo } from 'react';
import { useAuthentication } from '../hooks';

export const AuthorizationContext = createContext<any>(undefined);

interface DataActionsAuthorization {
  [key: string]: {
    actions: Set<string>;
  };
}

export const AuthorizationProvider = ({ children }: any) => {
  const { user } = useAuthentication();

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

  const hasPermission = (moduleName: string, actionName: string): boolean => {
    return data[moduleName]?.actions.has(actionName) ?? false;
  };

  const hasMoreThanOnePermission = (moduleName: string) => {
    return data[moduleName]?.actions.size;
  };

  return (
    <AuthorizationContext.Provider
      value={{
        user,
        nameModulesUser,
        hasPermission,
        hasMoreThanOnePermission,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
