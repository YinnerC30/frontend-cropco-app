import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../hooks';

export const AuthenticationLayout = () => {
  const { isLogin } = useAuthentication();

  if (isLogin) {
    return <Navigate to={'../home'} replace />;
  }

  return <Outlet />;
};
export default AuthenticationLayout;
