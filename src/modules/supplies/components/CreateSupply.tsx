import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { usePostSupply } from '../hooks/mutations/usePostSupply';
import { MODULE_SUPPLIES_PATHS } from '../routes/pathRoutes';
import { formSchemaSupply } from '../utils';
import { FormSupply } from './form/FormSupply';

export const CreateSupply = () => {
  const { mutate, isPending } = usePostSupply();

  const onSubmit = (values: z.infer<typeof formSchemaSupply>) => {
    mutate(values);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIES_PATHS.ViewAll, name: 'Insumos' }]}
        finalItem={`Registro`}
      />

      <FormSupply onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateSupply;
