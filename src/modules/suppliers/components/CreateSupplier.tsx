import { z } from 'zod';

import { usePostSupplier } from '../hooks/mutations/usePostSupplier';

import { BreadCrumb } from '@/modules/core/components';
import { MODULE_SUPPLIER_PATHS } from '../routes/pathRoutes';
import { formSchemaSupplier } from '../utils/formSchemaSupplier';
import { FormSupplier } from './form/FormSupplier';

export const CreateSupplier: React.FC = () => {
  const { mutate, isPending } = usePostSupplier();

  const onSubmit = (values: z.infer<typeof formSchemaSupplier>) => {
    mutate(values);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIER_PATHS.ViewAll, name: 'Proveedores' }]}
        finalItem={`Registro`}
      />

      <FormSupplier onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};
export default CreateSupplier;
