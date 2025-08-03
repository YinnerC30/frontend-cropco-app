import AuthTenantProvider from '@/management/auth/components/AuthTenantContext';
import { FormChangeProvider } from '@/modules/core/components';
import { useSubdomainRedirect } from '@/hooks/useSubdomainRedirect';
import { Outlet } from 'react-router-dom';

export const RoutesManagementController = () => {
  useSubdomainRedirect({
    redirectRoute: '/management/authentication/login',
    baseDomain: 'localhost',
    autoRedirect: true,
  });

  return (
    <AuthTenantProvider>
      <FormChangeProvider>
        <Outlet />
      </FormChangeProvider>
    </AuthTenantProvider>
  );
};

export default { RoutesManagementController };
