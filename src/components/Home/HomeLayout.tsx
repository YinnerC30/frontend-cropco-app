import { CommandDialogApp } from '@/modules/core/components/shared/CommandDialogApp';

import { useAuthContext, useCheckAuthStatus } from '@/auth/hooks';
import { PATH_LOGIN } from '@/config';
import { Loading } from '@/modules/core/components';
import { Navigate, Outlet } from 'react-router-dom';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './AppSideBar';

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
      <main>
        <div className="flex justify-center w-[80vw]">
          <div className="w-full mt-5 ml-10">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};
