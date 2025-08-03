import { Navigate, Outlet } from 'react-router-dom';
import { useAuthTenantContext } from './AuthTenantContext';
import { PATH_MANAGEMENT_HOME_APP } from '@/config';

export const AuthenticationTenantLayout: React.FC = () => {
  const { is_login } = useAuthTenantContext();
  if (is_login) {
    return <Navigate to={PATH_MANAGEMENT_HOME_APP} replace />;
  }
  return <Outlet />;
};
export default AuthenticationTenantLayout;
