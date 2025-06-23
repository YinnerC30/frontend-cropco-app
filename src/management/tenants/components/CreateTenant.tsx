import { BreadCrumb } from '@/modules/core/components';
import { FormTenant } from './form';
import { usePostTenant } from '../hooks';
import { MODULE_TENANTS_PATHS } from '../routes/pathRoutes';
import { formSchemaTenant } from '../utils/formSchemaTenant';
import { z } from 'zod';

export const CreateTenant: React.FC = () => {
  const { mutate, isPending } = usePostTenant();

  const handleSubmit = (values: z.infer<typeof formSchemaTenant>) => {
    mutate(values);
  };

  return (
    <div className="select-none">
      <BreadCrumb
        items={[{ link: MODULE_TENANTS_PATHS.ViewAll, name: 'Inquilinos' }]}
        finalItem={'Registro'}
      />
      <div className="">
        <FormTenant onSubmit={handleSubmit} isSubmitting={isPending} />
      </div>
    </div>
  );
};

export default CreateTenant;
