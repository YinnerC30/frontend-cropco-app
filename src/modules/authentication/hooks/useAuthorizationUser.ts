import { RootState, useAppSelector } from '@/redux/store';

export const useAuthorizationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);
  const modulesUser = user?.modules?.map((module: any) => module?.name) ?? [];
  return {
    modulesUser,
  };
};
