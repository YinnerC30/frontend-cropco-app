import { AuthenticationProvider } from '@/modules/authentication/components';
import { RoutesController } from './RoutesController';

export const RouterControllerContainer = () => {
  return (
    <AuthenticationProvider>
      <RoutesController />
    </AuthenticationProvider>
  );
};
