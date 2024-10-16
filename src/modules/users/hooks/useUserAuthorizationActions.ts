import { useGetModuleActions } from '@/modules/authentication/hooks/useGetModuleActions';
import { RootState, useAppSelector } from '@/redux/store';

export const useUserAuthorizationActions = () => {
  const { data, isLoading } = useGetModuleActions('users');
  const { modules } = useAppSelector(
    (state: RootState) => state.authentication.user
  );

  const userActionsIds =
    modules
      .find(
        (module: { name: string; actions: { id: string }[] }) =>
          module.name === 'users'
      )
      ?.actions.map((action: any) => action.id) || [];

  const moduleActions = data?.actions || [];

  const authorizationActions = moduleActions.reduce(
    (
      authorizationMap: Record<string, { visible: boolean }>,
      action: { id: string; name: string }
    ) => {
      authorizationMap[action.name] = {
        visible: userActionsIds.includes(action.id),
      };
      return authorizationMap;
    },
    {}
  );

  return {
    authorizationActions,
    isLoading
  };
};
