import { z } from 'zod';

import { BreadCrumb } from '../../core/components/BreadCrumb';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './FormCrop/FormCrop';
import { usePostCrop } from '../hooks';

export const CreateCrop = () => {
  const { mutate, isPending } = usePostCrop();

  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    mutate({ ...rest, ...dates });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Registro'}
      />

      <FormCrop onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateCrop;
