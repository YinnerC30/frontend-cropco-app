import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { PATH_HOME_APP, PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';
import { useGetOneTenant } from '../hooks/queries/useGetOneTenant';

export const AuthenticationLayout: React.FC = () => {
  const { isLogin, isLoading, isError } = useAuthContext();

  const currentSubdomain = window.location.hostname.split('.')[0];

  const queryTenant = useGetOneTenant(currentSubdomain);

  if (isLoading || queryTenant.isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  if (isLogin) {
    return <Navigate to={PATH_HOME_APP} replace />;
  }
  return <Outlet />;
};
export default AuthenticationLayout;
