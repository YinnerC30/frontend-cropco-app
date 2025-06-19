import { BreadCrumb } from '@/modules/core/components';
import { useAuthContext } from '@/auth/hooks';
import { Navigate, useParams } from 'react-router-dom';

export const ModifyTenant: React.FC = () => {
  const { hasPermission } = useAuthContext();
  const { id } = useParams();

  if (!hasPermission('tenants', 'update_one_tenant')) {
    return <Navigate to="/tenants/view/all" replace />;
  }

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Modificar Inquilino" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Modificar Inquilino</h1>
        <p className="text-gray-600">
          Formulario para modificar el inquilino con ID: {id} (Implementación pendiente)
        </p>
      </div>
    </div>
  );
};

export default ModifyTenant; 