import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { usePostHarvest } from '../hooks/mutations/usePostHarvest';
import { HarvestDetail } from '../interfaces/HarvestDetail';
import { MODULE_HARVESTS_PATHS } from '../routes/pathRoutes';
import { formSchemaHarvest } from '../utils';
import { FormHarvest } from './forms/harvest/FormHarvest';
import { Harvest } from '../interfaces';
import React from 'react';

export const CreateHarvest: React.FC = () => {
  const { mutate, isPending } = usePostHarvest();

  const onSubmit = (values: z.infer<typeof formSchemaHarvest>) => {
    mutate({
      ...values,
      crop: { id: values.crop.id },
      details: values.details.map((item: HarvestDetail) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          employee: { id: rest.employee.id },
        };
      }),
    } as unknown as Harvest);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' }]}
        finalItem={`Registro`}
      />
      <FormHarvest onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateHarvest;
