import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb, Loading } from '../../core/components';
import { useGetCrop } from '../hooks/queries/useGetCrop';


import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';

import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { formSchemaCrop } from '../utils';
import { FormCrop } from './FormCrop/FormCrop';
import { usePatchCrop } from '../hooks';

export const ModifyCrop = () => {
  const { id } = useParams();

  const { mutate, isPending } = usePatchCrop();

  const { data, isLoading } = useGetCrop(id!);

  const onSubmit = (values: z.infer<typeof formSchemaCrop>) => {
    const { dates, ...rest } = values;
    mutate({ ...rest, ...dates, id });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Modificar'}
      />

      <FormCrop
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={{
          ...data,
          dates: {
            date_of_creation: ConvertStringToDate(data.date_of_creation),
            date_of_termination: data.date_of_termination
              ? ConvertStringToDate(data.date_of_termination)
              : undefined,
          },
        }}
      />
    </>
  );
};

export default ModifyCrop;
