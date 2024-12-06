import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { Loading } from '../../core/components';
import { usePatchHarvest } from '../hooks/mutations/usePatchHarvest';
import { useGetHarvest } from '../hooks/queries/useGetHarvest';
import { HarvestDetail } from '../interfaces/HarvestDetail';
import { MODULE_HARVESTS_PATHS } from '../routes/pathRoutes';
import { formSchemaHarvest } from '../utils';
import { FormHarvest } from './forms/harvest/FormHarvest';
import { useAppDispatch } from '@/redux/store';
import { reset } from '../utils/harvestSlice';

export const ModifyHarvest = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetHarvest(id!);
  const { mutate, isPending } = usePatchHarvest(id!);
  const dispatch = useAppDispatch();

  dispatch(reset());

  const onSubmitHarvest = (
    values: z.infer<typeof formSchemaHarvest>,
    details: HarvestDetail[],
    total: number,
    value_pay: number
  ) => {
    mutate(
      {
        id,
        ...values,
        crop: { id: values.crop.id },
        total,
        value_pay,
        details: details.map((item: HarvestDetail) => {
          const { id, payments_harvest, ...rest } = item;
          return { ...rest, employee: { id: rest.employee.id } };
        }),
      },
      {
        onSuccess: () => {
          dispatch(reset());
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_HARVESTS_PATHS.ViewAll, name: 'Cosechas' }]}
        finalItem={`Modificar`}
      />

      {/* Formulario principal */}
      <FormHarvest
        onSubmit={onSubmitHarvest}
        isSubmitting={isPending}
        defaultValues={{
          ...data,
          date: ConvertStringToDate(data.date),
        }}
      />
    </>
  );
};
