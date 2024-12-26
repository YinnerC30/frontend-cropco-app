import { z } from 'zod';

import { BreadCrumb } from '../../core/components/';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './form/FormCrop';
import { usePostCrop } from '../hooks';
import React from 'react';
import { Crop } from '../interfaces/Crop';

export const CreateCrop: React.FC = () => {
  const { mutate, isPending } = usePostCrop();

  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    const data: Crop = { ...rest, ...dates } as unknown as Crop;
    mutate(data);
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
