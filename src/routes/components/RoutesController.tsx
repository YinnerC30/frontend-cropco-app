import { useAuthentication } from '@/modules/authentication/hooks/useAuthentication';
import { useCheckAuthStatus } from '@/modules/authentication/hooks/useCheckAuthStatus';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  const { isLogin } = useAuthentication();

  const [executeQuery, setExecuteQuery] = useState(false);

  const disabledQuery = () => {
    setExecuteQuery(false);
  };

  useCheckAuthStatus({
    executeQuery: executeQuery,
    onErrorAction: disabledQuery,
  });

  useEffect(() => {
    isLogin && setExecuteQuery(true);
  }, []);

  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};
export default { RoutesController };
