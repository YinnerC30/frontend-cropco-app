import { FormChangeProvider } from '@/modules/core/components';
import { Outlet } from 'react-router-dom';

export const RoutesManagementController = () => {
  return (
    // <AuthProvider>
    <FormChangeProvider>
      <Outlet />
    </FormChangeProvider>
    // </AuthProvider>
  );
};
export default { RoutesManagementController };
