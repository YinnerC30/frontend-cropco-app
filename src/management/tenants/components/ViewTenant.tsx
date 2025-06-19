import { BreadCrumb } from '@/modules/core/components';
import { useAuthContext } from '@/auth/hooks';
import { Navigate, useParams } from 'react-router-dom';

export const ViewTenant: React.FC = () => {
  const { hasPermission } = useAuthContext();
  const { id } = useParams();

  if (!hasPermission('tenants', 'find_one_tenant')) {
    return <Navigate to="/tenants/view/all" replace />;
  }

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Ver Inquilino" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Detalles del Inquilino</h1>
        <p className="text-gray-600">
          Vista detallada del inquilino con ID: {id} (Implementación pendiente)
        </p>
      </div>
    </div>
  );
};

export default ViewTenant; 