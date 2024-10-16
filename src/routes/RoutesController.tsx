import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useCheckAuthStatus } from '@/modules/authentication/hooks/useCheckAuthStatus';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  const { isLogin, tokenSesion } = useAuthenticationUser();

  const { mutate } = useCheckAuthStatus();

  useEffect(() => {
    if (isLogin) {
      mutate({ token: tokenSesion });
    }
  }, []);

  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { RoutesController };
