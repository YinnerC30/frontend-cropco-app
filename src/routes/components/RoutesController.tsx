import { AuthProvider } from '@/modules/authentication/components';
import { Outlet } from 'react-router-dom';

export const RoutesController = () => {
  return (
    <AuthProvider>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </AuthProvider>
  );
};
export default { RoutesController };
