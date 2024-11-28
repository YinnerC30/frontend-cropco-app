import { PATH_HOME_APP } from '@/config';
import { useAuthenticationContext } from '@/modules/authentication/hooks/useAuthenticationContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProtectedRoute = ({
  element,
  module,
  action,
  viewComponent = false,
}: any) => {
  const { user, hasPermission, hasMoreThanOnePermission } =
    useAuthenticationContext();

  if (viewComponent && hasMoreThanOnePermission(module) >= 1) {
    return element;
  }

  if (!user || !hasPermission(module, action)) {
    setTimeout(
      () =>
        user.isLogin &&
        toast.error('No tienes permiso para esta acción, seras redirigido'),
      1000
    );

    return <Navigate to={PATH_HOME_APP} replace />;
  }

  return element;
};

export default ProtectedRoute;
