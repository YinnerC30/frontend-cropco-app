import { CommandDialogApp } from '@/modules/core/components/shared/CommandDialogApp';

import { useAuthContext, useCheckAuthStatus } from '@/auth/hooks';
import { PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './AppSideBar';
import { MainContent } from './MainContent';

export const HomeLayout = () => {
  const { tokenSession, isLogin } = useAuthContext();

  const query = useCheckAuthStatus({
    token: tokenSession!,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (!isLogin) {
    return <Navigate to={PATH_LOGIN} replace />;
  }

  return (
    <SidebarProvider>
      <CommandDialogApp />
      <AppSidebar />
      <MainContent />
    </SidebarProvider>
  );
};
