import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useHasPermission } from '../hooks/useHasPermission';

const ProtectedRoute = ({ element, module, action }: any) => {
  const { user } = useAuthentication();
  const hasPermission = useHasPermission(module, action);
  if (!user || !hasPermission) {
    return <Navigate to="/app/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
