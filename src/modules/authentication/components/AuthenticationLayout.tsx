import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticationContext } from '../hooks';
import { PATH_HOME_APP } from '@/config';

export const AuthenticationLayout = () => {
  const { isLogin } = useAuthenticationContext();

  if (isLogin) {
    return <Navigate to={PATH_HOME_APP} replace />;
  }
  return <Outlet />;
};
export default AuthenticationLayout;
