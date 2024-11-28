import {
  AuthenticationProvider,
  AuthorizationProvider,
} from '@/modules/authentication/components';
import { RoutesController } from './RoutesController';

export const RouterControllerContainer = () => {
  return (
    <AuthenticationProvider>
      <AuthorizationProvider>
        <RoutesController />
      </AuthorizationProvider>
    </AuthenticationProvider>
  );
};
