import useAuthentication from './useAuthentication';

export const useAuthorization = () => {
  const { getModuleActions, user } = useAuthentication();

  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

  const hasPermission = (moduleName: string, actionName: string) => {
    const actions = getModuleActions(moduleName);
    return actions.some((action: any) => action.name === actionName);
  };

  return {
    modulesUser,
    hasPermission,
    user,
  };
};
