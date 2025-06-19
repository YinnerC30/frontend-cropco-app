import { BreadCrumb } from '@/modules/core/components';
import { useAuthContext } from '@/auth/hooks';
import { Navigate, useParams } from 'react-router-dom';
import { FormTenant } from './form';

export const ViewTenant: React.FC = () => {
  const { hasPermission } = useAuthContext();
  const { id } = useParams();

  if (!hasPermission('tenants', 'find_one_tenant')) {
    return <Navigate to="/tenants/view/all" replace />;
  }

  const handleSubmit = (values: any) => {
    // En modo solo lectura, no se hace nada
    console.log('Vista de tenant con ID:', id, 'valores:', values);
  };

  // Aquí se cargarían los datos del tenant para pasarlos como defaultValues
  const defaultValues = {
    subdomain: '',
    company_name: '',
    email: '',
    cell_phone_number: '',
  };

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Ver Inquilino" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Detalles del Inquilino</h1>
        <FormTenant onSubmit={handleSubmit} defaultValues={defaultValues} readOnly={true} />
      </div>
    </div>
  );
};

export default ViewTenant; 