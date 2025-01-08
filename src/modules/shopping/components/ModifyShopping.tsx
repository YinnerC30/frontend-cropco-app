import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import React from 'react';
import { usePatchShopping } from '../hooks/mutations/usePatchShopping';
import { useGetShopping } from '../hooks/queries/useGetShopping';
import { ShoppingDetail } from '../interfaces';
import { MODULE_SHOPPING_PATHS } from '../routes/pathRoutes';
import { formSchemaShopping } from '../utils/formSchemaShopping';
import FormShopping from './forms/shopping/FormShopping';

export const ModifyShopping: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetShopping(id!);
  const { mutate, isPending } = usePatchShopping(id!);

  const onSubmitShopping = (values: z.infer<typeof formSchemaShopping>) => {
    mutate({
      id,
      ...values,
      details: values.details.map((item: ShoppingDetail) => ({
        ...item,
        supplier: { id: item.supplier.id },
        supply: { id: item.supply.id },
      })),
    });
  };

  // Render loading or error states
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SHOPPING_PATHS.ViewAll, name: 'Compras' }]}
        finalItem={`Modificar`}
      />

      {/* Formulario principal */}
      <FormShopping
        onSubmit={onSubmitShopping}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};
export default ModifyShopping;
