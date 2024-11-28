import useAuthentication from './useAuthentication';

export const useAuthorization = () => {
  const { getModuleActions, user } = useAuthentication();

  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

  const hasPermission = (moduleName: string, actionName: string): boolean => {
    const actions = getModuleActions(moduleName);
    return actions.some((action: any) => action.name === actionName);
  };

  const hasMoreThanOnePermission = (moduleName: string) => {
    const actions = getModuleActions(moduleName);
    return actions.length;
  };

  return {
    modulesUser,
    hasPermission,
    user,
    hasMoreThanOnePermission,
  };
};
