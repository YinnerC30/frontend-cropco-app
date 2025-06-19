import { BreadCrumb } from '@/modules/core/components';
import { useAuthContext } from '@/auth/hooks';
import { Navigate } from 'react-router-dom';

export const CreateTenant: React.FC = () => {
  const { hasPermission } = useAuthContext();

  if (!hasPermission('tenants', 'create_tenant')) {
    return <Navigate to="/tenants/view/all" replace />;
  }

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Crear Inquilino" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Inquilino</h1>
        <p className="text-gray-600">
          Formulario para crear un nuevo inquilino. (Implementación pendiente)
        </p>
      </div>
    </div>
  );
};

export default CreateTenant; 