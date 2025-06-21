import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { PATH_HOME_APP, PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';
import { useGetOneTenant } from '../hooks/queries/useGetOneTenant';

export const AuthenticationLayout: React.FC = () => {
  const { is_login, isLoading, isError } = useAuthContext();

  const currentSubdomain = window.location.hostname.split('.')[0];

  const queryTenant = useGetOneTenant(currentSubdomain);

  if (isLoading || queryTenant.isLoading) {
    return (
      <main className="flex items-center justify-center w-screen h-screen">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  if (is_login) {
    return <Navigate to={PATH_HOME_APP} replace />;
  }
  return <Outlet />;
};
export default AuthenticationLayout;
