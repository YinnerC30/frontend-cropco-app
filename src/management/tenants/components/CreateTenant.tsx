import { BreadCrumb } from '@/modules/core/components';
import { FormTenant } from './form';
import { usePostTenant } from '../hooks';

export const CreateTenant: React.FC = () => {
  const { mutate, isPending } = usePostTenant();

  const handleSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="select-none">
      <BreadCrumb finalItem="Crear Inquilino" />
      <div className="">
        <FormTenant onSubmit={handleSubmit} isSubmitting={isPending} />
      </div>
    </div>
  );
};

export default CreateTenant;
