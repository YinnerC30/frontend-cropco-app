import { AppDispatch, useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { usePostHarvest } from '../hooks/mutations/usePostHarvest';
import { HarvestDetail } from '../interfaces/HarvestDetail';
import { MODULE_HARVESTS_PATHS } from '../routes/pathRoutes';
import { formSchemaHarvest } from '../utils';
import { reset } from '../utils/harvestSlice';
import { FormHarvest } from './forms/harvest/FormHarvest';

export const CreateHarvest = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { mutate, isSuccess, isPending } = usePostHarvest();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const navigate = useNavigate();

  const onSubmit = (
    values: z.infer<typeof formSchemaHarvest>,
    details: HarvestDetail[],
    total: number,
    value_pay: number
  ) => {
    mutate({
      ...values,
      crop: { id: values.crop.id },
      total,
      value_pay,
      details: details.map((item: HarvestDetail) => {
        const { id, ...rest } = item;
        return { ...rest, employee: { id: rest.employee.id } };
      }),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate('../view/all');
  }

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
