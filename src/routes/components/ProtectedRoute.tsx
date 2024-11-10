import { useAuthorization } from '@/modules/authentication/hooks/useAuthorization';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProtectedRoute = ({
  element,
  module,
  action,
  viewComponent = false,
}: any) => {
  const { user, hasPermission, hasMoreThanOnePermission } = useAuthorization();

  if (viewComponent && hasMoreThanOnePermission(module) >= 1) {
    return element;
  }

  if (!user || !hasPermission(module, action)) {
    setTimeout(
      () =>
        user.isLogin &&
        toast.error(
          'No tienes permiso para esta acción, seras redirigido a la pagina principal'
        ),
      1000
    );

    return <Navigate to={`/app/home`} replace />;
  }

  return element;
};

export default ProtectedRoute;
