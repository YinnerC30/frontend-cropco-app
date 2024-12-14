import { Loading } from '@/modules/core/components';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetSale, usePatchSale } from '../hooks';
import { SaleDetail } from '../interfaces';
import { formSchemaSale } from '../utils';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { MODULE_SALES_PATHS } from '../routes/pathRoutes';
import { FormSale } from './forms/sale/FormSale';

export const ModifySale = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSale(id!);
  const { mutate, isPending } = usePatchSale(id!);

  const navigate = useNavigate();

  // Handle form submission
  const onSubmitSale = (values: z.infer<typeof formSchemaSale>) => {
    mutate(
      {
        id,
        ...values,
        details: values.details.map(({ id, ...rest }: SaleDetail) => ({
          ...rest,
          client: { id: rest.client.id },
          crop: { id: rest.crop.id },
        })),
      },
      {
        onSuccess: () => {
          navigate('../view/all');
        },
      }
    );
  };

  // Render loading or error states
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SALES_PATHS.ViewAll, name: 'Ventas' }]}
        finalItem={`Modificar`}
      />

      {/* Formulario principal */}
      <FormSale
        onSubmit={onSubmitSale}
        defaultValues={{
          ...data,
          date: ConvertStringToDate(data.date),
        }}
        isSubmitting={isPending}
      />
    </>
  );
};
