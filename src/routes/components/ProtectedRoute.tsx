import { useAuthentication } from '@/modules/authentication/hooks/useAuthentication';
import { useHasPermission } from '@/modules/authentication/hooks/useHasPermission';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  element,
  module,
  action,
  viewComponent = false,
}: any) => {
  const { user } = useAuthentication();

  const hasPermission = useHasPermission(module, action);

  if (viewComponent) {
    return element;
  }

  if (!user || !hasPermission) {
    return <Navigate to="/app/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
