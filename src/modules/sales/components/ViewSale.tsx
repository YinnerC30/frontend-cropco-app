import { ErrorLoading, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetSale } from '../hooks';

import { BreadCrumb } from '@/modules/core/components/';
import { ConvertStringToDate } from '@/modules/core/helpers/conversion/ConvertStringToDate';
import { MODULE_SALES_PATHS } from '../routes/pathRoutes';
import { FormSale } from './forms/sale/FormSale';

export const ViewSale = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSale(id!);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SALES_PATHS.ViewAll, name: 'Ventas' }]}
        finalItem={`Información de la venta`}
      />

      {/* Formulario principal */}
      <FormSale
        defaultValues={{
          ...data,
          date: ConvertStringToDate(data.date),
        }}
        readOnly
      />
    </>
  );
};
export default ViewSale;
