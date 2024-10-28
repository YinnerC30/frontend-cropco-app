import { useAuthentication } from '@/modules/authentication/hooks/useAuthentication';
import { useCheckAuthStatus } from '@/modules/authentication/hooks/useCheckAuthStatus';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRoutesManager } from './hooks/useRoutesManager';

export const RoutesController = () => {
  const { isLogin, tokenSesion } = useAuthentication();

  const { mutate } = useCheckAuthStatus();
  const { redirectToLogin } = useRoutesManager();

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
