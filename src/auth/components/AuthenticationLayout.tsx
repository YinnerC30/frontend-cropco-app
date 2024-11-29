import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { PATH_HOME_APP } from '@/config';

export const AuthenticationLayout = () => {
  const { isLogin } = useAuthContext();

  if (isLogin) {
    return <Navigate to={PATH_HOME_APP} replace />;
  }
  return <Outlet />;
};
export default AuthenticationLayout;
