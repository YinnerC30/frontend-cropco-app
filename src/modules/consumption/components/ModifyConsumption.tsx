import { Loading } from '@/modules/core/components';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetConsumption } from '../hooks/queries/useGetConsumption';

import { ConsumptionDetails } from '../interfaces/ConsumptionDetails';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { usePatchConsumption } from '../hooks/mutations/usePatchConsumption';
import { MODULE_CONSUMPTION_PATHS } from '../routes/pathRoutes';
import { formSchemaConsumption } from '../utils/formSchemaConsumption';
import { FormConsumption } from './forms/consumption/FormConsumption';

export const ModifyConsumption = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetConsumption(id!);
  const { mutate, isPending } = usePatchConsumption(id!);
  const navigate = useNavigate();

  const onSubmitShopping = (values: z.infer<typeof formSchemaConsumption>) => {
    mutate(
      {
        id,
        ...values,

        details: values.details.map((item: ConsumptionDetails) => {
          return {
            ...item,
            crop: { id: item.crop.id },
            supply: { id: item.supply.id },
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

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CONSUMPTION_PATHS.ViewAll, name: 'Consumos' }]}
        finalItem={`Modificar`}
      />

      {/* Formulario principal */}
      <FormConsumption
        onSubmit={onSubmitShopping}
        isSubmitting={isPending}
        defaultValues={{ ...data, date: ConvertStringToDate(data.date) }}
      />
    </>
  );
};
export default ModifyConsumption;
