import { BreadCrumb } from '@/modules/core/components';
import { useAuthContext } from '@/auth/hooks';
import { Navigate, useParams } from 'react-router-dom';
import { FormTenant } from './form';

export const ModifyTenant: React.FC = () => {
  const { hasPermission } = useAuthContext();
  const { id } = useParams();

  if (!hasPermission('tenants', 'update_one_tenant')) {
    return <Navigate to="/tenants/view/all" replace />;
  }

  const handleSubmit = (values: any) => {
    console.log('Modificar tenant con ID:', id, 'valores:', values);
    // Aquí se implementará la lógica para modificar el tenant
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
      <BreadCrumb finalItem="Modificar Inquilino" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Modificar Inquilino</h1>
        <FormTenant onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </div>
  );
};

export default ModifyTenant; 