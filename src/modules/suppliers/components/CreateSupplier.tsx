import { z } from 'zod';

import { usePostSupplier } from '../hooks/mutations/usePostSupplier';

import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { MODULE_SUPPLIER_PATHS } from '../routes/pathRoutes';
import { formSchemaSupplier } from '../utils/formSchemaSupplier';
import { FormSupplier } from './FormSupplier/FormSupplier';

export const CreateSupplier = () => {
  const { mutate, isPending } = usePostSupplier();

  const onSubmit = async (values: z.infer<typeof formSchemaSupplier>) => {
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
