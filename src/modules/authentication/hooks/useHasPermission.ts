import { useMemo } from 'react';
import { useAuthentication } from './useAuthentication';

export const useHasPermission = (moduleName: string, actionName: string) => {
  const { getModuleActions } = useAuthentication();
  const actions = useMemo(() => getModuleActions(moduleName), [moduleName]);
  return actions.some((action: any) => action.name === actionName);
};
