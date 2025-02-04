import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { PATH_HOME_APP, PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';

export const AuthenticationLayout: React.FC = () => {
  const { isLogin, isLoading, isError } = useAuthContext();

  if (isLoading) {
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
