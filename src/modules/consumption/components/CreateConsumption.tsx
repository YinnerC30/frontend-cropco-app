import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { formSchemaConsumption } from '../utils/formSchemaConsumption';

import { BreadCrumb } from '@/modules/core/components/';
import { ConsumptionDetails } from '../interfaces/ConsumptionDetails';
import { MODULE_CONSUMPTION_PATHS } from '../routes/pathRoutes';
import { FormConsumption } from './forms/consumption/FormConsumption';
import { usePostConsumption } from '../hooks/mutations/usePostConsumption';

export const CreateConsumption = () => {
  const { mutate, isPending } = usePostConsumption();

  const navigate = useNavigate();
  const onSubmitShopping = (values: z.infer<typeof formSchemaConsumption>) => {
    console.log(values);
    mutate(
      {
        ...values,
        details: values.details.map((item: ConsumptionDetails) => {
          const { id, ...rest } = item;
          return {
            ...rest,
            crop: { id: rest.crop.id },
            supply: { id: rest.supply.id },
          };
        }),
      },
      {
        onSuccess: () => {
          navigate('../view/all');
        },
      }
    );
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CONSUMPTION_PATHS.ViewAll, name: 'Consumos' }]}
        finalItem={`Crear`}
      />

      <FormConsumption onSubmit={onSubmitShopping} isSubmitting={isPending} />
    </>
  );
};
export default CreateConsumption;
