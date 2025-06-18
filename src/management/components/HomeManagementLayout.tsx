import { PATH_ADMIN_LOGIN } from '@/config';
import { Navigate } from 'react-router-dom';
import { useAuthTenantContext } from './AuthTenantContext';
import { Button } from '@/components';
// import { SidebarProvider } from '../ui/sidebar';
// import { AppSidebar } from './AppSideBar';
// import { MainContent } from './MainContent';

export const HomeManagementLayout = () => {
  const { isLogin, removeTenantManagement } = useAuthTenantContext();

  // const query = useCheckAuthStatus({
  //   token: tokenSession!,
  // });

  // if (query.isLoading) {
  //   return <Loading />;
  // }

  if (!isLogin) {
    return <Navigate to={PATH_ADMIN_LOGIN} replace />;
  }

  return (
    <div>
      <h1>Panel de control de CropCo</h1>
      <Button type="button" onClick={removeTenantManagement}>
        Cerrar sesión
      </Button>
    </div>
  );
};
