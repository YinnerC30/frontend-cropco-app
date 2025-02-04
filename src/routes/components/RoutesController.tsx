import { AuthProvider } from '@/auth';
import { FormChangeProvider } from '@/modules/core/components';
import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  return (
    <AuthProvider>
      <FormChangeProvider>
        <Outlet />
      </FormChangeProvider>
    </AuthProvider>
  );
};
export default { RoutesController };
