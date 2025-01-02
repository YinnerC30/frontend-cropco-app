import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetSale, usePatchSale } from '../hooks';
import { SaleDetail } from '../interfaces';
import { formSchemaSale } from '../utils';

import { BreadCrumb } from '@/modules/core/components/';
import React from 'react';
import { MODULE_SALES_PATHS } from '../routes/pathRoutes';
import { FormSale } from './forms/sale/FormSale';

export const ModifySale: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSale(id!);
  const { mutate, isPending } = usePatchSale(id!);

  const onSubmitSale = (values: z.infer<typeof formSchemaSale>) => {
    mutate({
      id,
      ...values,
      details: values.details.map((saleDetail: SaleDetail) => ({
        ...saleDetail,
        client: { id: saleDetail.client.id },
        crop: { id: saleDetail.crop.id },
      })),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SALES_PATHS.ViewAll, name: 'Ventas' }]}
        finalItem={`Modificar`}
      />

      <FormSale
        onSubmit={onSubmitSale}
        defaultValues={data}
        isSubmitting={isPending}
      />
    </>
  );
};
export default ModifySale;
