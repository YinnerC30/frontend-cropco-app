import { AuthProvider } from '@/modules/authentication/components';
import { RoutesController } from './RoutesController';

export const RouterControllerContainer = () => {
  return (
    <AuthProvider>
      <RoutesController />
    </AuthProvider>
  );
};
