import { useAuthorization } from '@/modules/authentication/hooks/useAuthorization';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  element,
  module,
  action,
  viewComponent = false,
}: any) => {
  const { user, hasPermission } = useAuthorization();

  if (viewComponent) {
    return element;
  }

  if (!user || !hasPermission(module, action)) {
    return <Navigate to="/app/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
