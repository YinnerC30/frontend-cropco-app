import { Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import {
  AllUnitsOfMeasure
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { useGetSupply } from '../hooks';
import { usePatchSupply } from '../hooks/mutations/usePatchSupply';
import { MODULE_SUPPLIES_PATHS } from '../routes/pathRoutes';
import { formSchemaSupply } from '../utils';
import { FormSupply } from './form/FormSupply';

export const ModifySupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);
  const { mutate, isPending } = usePatchSupply();

  const onSubmit = (values: z.infer<typeof formSchemaSupply>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIES_PATHS.ViewAll, name: 'Insumos' }]}
        finalItem={`Modificar`}
      />

      <FormSupply
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={{
          ...data,
          name: data?.name!,
          brand: data?.brand!,
          observation: data?.observation!,
          unit_of_measure:
            AllUnitsOfMeasure[
              data?.unit_of_measure as keyof typeof AllUnitsOfMeasure
            ],
        }}
      />
    </>
  );
};

export default ModifySupply;
