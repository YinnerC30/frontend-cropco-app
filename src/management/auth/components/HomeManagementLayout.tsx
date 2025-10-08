import { MainContent, SidebarProvider } from '@/components';
import { PATH_ADMIN_LOGIN } from '@/config';
import { Navigate } from 'react-router-dom';
import { AppManagementSidebar } from './AppManagementSideBar';
import { useAuthTenantContext } from './AuthTenantContext';
import { Loading } from '@/modules/core/components';
import { useCheckAuthStatusManagement } from '../hooks/queries/useCheckAuthStatusManagement';
import useDocumentTitle from '@/modules/core/hooks/useDocumentTitle';
// import { SidebarProvider } from '../ui/sidebar';
// import { AppSidebar } from './AppSideBar';
// import { MainContent } from './MainContent';

export const HomeManagementLayout = () => {
  useDocumentTitle({ title: 'Inicio Administración' });
  const { is_login, tokenSession } = useAuthTenantContext();

  const query = useCheckAuthStatusManagement({
    token: tokenSession!,
  });

  if (query.isLoading) {
    return (
      <main className="flex items-center justify-center w-screen h-screen">
        <Loading />
      </main>
    );
  }

  if (!is_login) {
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
