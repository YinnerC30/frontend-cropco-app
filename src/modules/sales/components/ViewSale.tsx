import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetSale } from '../hooks';

import { BreadCrumb } from '@/modules/core/components/';
import { MODULE_SALES_PATHS } from '../routes/pathRoutes';
import { FormSale } from './forms/sale/FormSale';

export const ViewSale: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSale(id!);
  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SALES_PATHS.ViewAll, name: 'Ventas' }]}
        finalItem={`Información de la venta`}
      />

      <FormSale defaultValues={data} readOnly />
    </>
  );
};
export default ViewSale;
