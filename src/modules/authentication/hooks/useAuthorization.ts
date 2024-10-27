import { useGetAllModules } from '@/modules/core/hooks/useGetAllModules';
import { RootState, useAppSelector } from '@/redux/store';
import { useMemo } from 'react';

export const useAuthorization = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];

  const userActionsIds = useMemo(
    () =>
      user?.modules
        .map((module: any) => module?.actions?.map((action: any) => action?.id))
        .flat() ?? [],
    [user]
  );

  const { data = [] } = useGetAllModules();

  const authorizationActions = useMemo(
    () =>
      data.reduce((acumulator: any, currentValue: any) => {
        acumulator[currentValue.name] = currentValue.actions.reduce(
          (acu: any, cuv: any) => {
            const { name, id } = cuv;
            acu[name] = {
              visible: userActionsIds.includes(id),
            };
            return acu;
          },
          {}
        );
        return acumulator;
      }, {}),
    [data, userActionsIds]
  );

  return {
    modulesUser,
    authorizationActions,
  };
};
