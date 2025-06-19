import { BreadCrumb } from '@/modules/core/components';
import { FormTenant } from './form';

export const CreateTenant: React.FC = () => {
  // const { hasPermission } = useAuthContext();

  // if (!hasPermission('tenants', 'create_tenant')) {
  //   return <Navigate to="/tenants/view/all" replace />;
  // }

  const handleSubmit = (values: any) => {
    console.log('Crear tenant con valores:', values);
    // Aquí se implementará la lógica para crear el tenant
  };

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Crear Inquilino" />
      <div className="">
        <FormTenant onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateTenant;
