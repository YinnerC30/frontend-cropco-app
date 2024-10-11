import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRoutesManager } from './hooks/useRoutesManager';
import { useCheckAuthStatus } from '@/modules/authentication/hooks/useCheckAuthStatus';

export const RoutesController = () => {
  const { redirectToLogin } = useRoutesManager();
  const { isLogin, tokenSesion } = useAuthenticationUser();

  const { mutate } = useCheckAuthStatus();

  useEffect(() => {
    if (isLogin) {
      mutate({ token: tokenSesion });
    } else {
      redirectToLogin();
    }
  }, []);

  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { RoutesController };
