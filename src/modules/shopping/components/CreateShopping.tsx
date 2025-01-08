import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import React from 'react';
import { usePostShopping } from '../hooks/mutations/usePostShopping';
import { ShoppingDetail } from '../interfaces/ShoppingDetails';
import { MODULE_SHOPPING_PATHS } from '../routes/pathRoutes';
import { formSchemaShopping } from '../utils/formSchemaShopping';
import { FormShopping } from './forms/shopping/FormShopping';

export const CreateShopping: React.FC = () => {
  const { mutate, isPending } = usePostShopping();

  const onSubmitShopping = (values: z.infer<typeof formSchemaShopping>) => {
    mutate({
      ...values,
      details: values.details.map((item: ShoppingDetail) => ({
        ...item,
        supplier: { id: item.supplier.id },
        supply: { id: item.supply.id },
      })),
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SHOPPING_PATHS.ViewAll, name: 'Compras' }]}
        finalItem={`Registro`}
      />

      {/* Formulario principal */}
      <FormShopping onSubmit={onSubmitShopping} isSubmitting={isPending} />
    </>
  );
};
export default CreateShopping;
