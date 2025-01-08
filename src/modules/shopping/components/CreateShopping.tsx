import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { usePostShopping } from '../hooks/mutations/usePostShopping';
import { ShoppingDetail } from '../interfaces/ShoppingDetails';
import { MODULE_SHOPPING_PATHS } from '../routes/pathRoutes';
import { formSchemaShopping } from '../utils/formSchemaShopping';
import { FormShopping } from './forms/shopping/FormShopping';
import React from 'react';

export const CreateShopping: React.FC = () => {
  const { mutate, isPending } = usePostShopping();

  const navigate = useNavigate();
  const onSubmitShopping = (values: z.infer<typeof formSchemaShopping>) => {
    mutate(
      {
        ...values,
        details: values.details.map((item: ShoppingDetail) => {
          const { id, ...rest } = item;
          return {
            ...rest,
            supplier: { id: rest.supplier.id },
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
        items={[{ link: MODULE_SHOPPING_PATHS.ViewAll, name: 'Compras' }]}
        finalItem={`Registro`}
      />

      {/* Formulario principal */}
      <FormShopping onSubmit={onSubmitShopping} isSubmitting={isPending} />
    </>
  );
};
export default CreateShopping;
