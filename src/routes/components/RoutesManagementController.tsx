import AuthTenantProvider from '@/management/components/AuthTenantContext';
import { FormChangeProvider } from '@/modules/core/components';
import { Outlet } from 'react-router-dom';

export const RoutesManagementController = () => {
  return (
    <AuthTenantProvider>
      <FormChangeProvider>
        <Outlet />
      </FormChangeProvider>
    </AuthTenantProvider>
  );
};
export default { RoutesManagementController };
