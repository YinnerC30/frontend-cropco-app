import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { SaleDetail } from '../interfaces';
import { formSchemaSale } from '../utils';

import { BreadCrumb } from '@/modules/core/components/';
import { MODULE_SALES_PATHS } from '../routes/pathRoutes';
import FormSale from './forms/sale/FormSale';
import { usePostSale } from '../hooks';

export const CreateSale = () => {
  const { mutate, isPending } = usePostSale();

  const navigate = useNavigate();

  const onSubmitSale = (values: z.infer<typeof formSchemaSale>) => {
    mutate(
      {
        ...values,
        details: values.details.map((item: SaleDetail) => {
          const { id, ...rest } = item;
          return {
            ...rest,
            client: { id: rest.client.id },
            crop: { id: rest.crop.id },
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
        items={[{ link: MODULE_SALES_PATHS.ViewAll, name: 'Ventas' }]}
        finalItem={`Registro`}
      />
      <FormSale onSubmit={onSubmitSale} isSubmitting={isPending} />
    </>
  );
};
