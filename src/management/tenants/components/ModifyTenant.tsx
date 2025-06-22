import { BreadCrumb, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetTenant, usePatchTenant } from '../hooks';
import { MODULE_TENANTS_PATHS } from '../routes/pathRoutes';
import { formSchemaTenant } from '../utils/formSchemaTenant';
import { FormTenant } from './form';

export const ModifyTenant: React.FC = () => {
  const { id } = useParams();
  const { mutate, isPending } = usePatchTenant();
  const { data, isLoading } = useGetTenant(id!);
  const onSubmit = (values: z.infer<typeof formSchemaTenant>) => {
    mutate({ id, ...values });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_TENANTS_PATHS.ViewAll, name: 'Inquilinos' }]}
        finalItem={'Modificar'}
      />

      <FormTenant
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};

export default ModifyTenant;
