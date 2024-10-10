import { useAuthenticationUser } from '@/modules/authentication/hooks/useAuthenticationUser';
import { useCheckAuthStatus } from '@/modules/authentication/hooks/useCheckAuthStatus';
import { Loading } from '@/modules/core/components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const mutationCheckAuthStatus = useCheckAuthStatus();

  const { getTokenSesion, isActiveSesion, redirectToLogin } =
    useAuthenticationUser();

  useEffect(() => {
    if (isActiveSesion()) {
      mutationCheckAuthStatus.mutate({ token: getTokenSesion() });
    } else {
      redirectToLogin();
    }
  }, []);

  if (mutationCheckAuthStatus.isPending) return <Loading />;

  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { Layout };
