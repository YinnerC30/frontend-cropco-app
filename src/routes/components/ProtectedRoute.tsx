import { PATH_HOME_APP } from '@/config';
import { useAuthContext } from '@/auth/hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import useDocumentTitle from '@/modules/core/hooks/useDocumentTitle';
import React from 'react';

interface Props {
  element: React.ReactNode;
  module: string;
  action: string;
  viewComponent: boolean;
  label: string;
}

export const ProtectedRoute = ({
  element,
  module,
  action,
  viewComponent = false,
  label,
}: Props) => {
  const { user, hasPermission, hasMoreThanOnePermission } = useAuthContext();

  useDocumentTitle({ title: label });

  if (viewComponent && hasMoreThanOnePermission(module) >= 1) {
    return element;
  }

  if (!user || !hasPermission(module, action)) {
    setTimeout(
      () =>
        user?.is_login &&
        toast.error('No tienes permiso para esta acción, seras redirigido'),
      1000
    );

    return <Navigate to={PATH_HOME_APP} replace />;
  }

  return element;
};

export default ProtectedRoute;
