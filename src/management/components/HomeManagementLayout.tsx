import { MainContent, SidebarProvider } from '@/components';
import { PATH_ADMIN_LOGIN } from '@/config';
import { Navigate } from 'react-router-dom';
import { AppManagementSidebar } from './AppManagementSideBar';
import { useAuthTenantContext } from './AuthTenantContext';
// import { SidebarProvider } from '../ui/sidebar';
// import { AppSidebar } from './AppSideBar';
// import { MainContent } from './MainContent';

export const HomeManagementLayout = () => {
  const { isLogin } = useAuthTenantContext();

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
      <SidebarProvider>
        {/* <CommandDialogApp /> */}
        <AppManagementSidebar />

        <MainContent />
      </SidebarProvider>
    </div>
  );
};
