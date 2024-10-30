import { useAuthorization } from '@/modules/authentication/hooks/useAuthorization';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    setTimeout(
      () => toast.error('No tienes permiso para esta acción, seras redirigido'),
      1000
    );
    return <Navigate to="/app/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
