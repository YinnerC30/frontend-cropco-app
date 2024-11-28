import { AuthorizationProvider } from '@/modules/authentication/components';
import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  return (
    <AuthorizationProvider>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </AuthorizationProvider>
  );
};
export default { RoutesController };
