import { Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';

import { useGetShopping } from '../hooks/queries/useGetShopping';
import { MODULE_SHOPPING_PATHS } from '../routes/pathRoutes';
import FormShopping from './forms/shopping/FormShopping';

export const ViewShopping: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetShopping(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SHOPPING_PATHS.ViewAll, name: 'Compras' }]}
        finalItem={`Información de la compra`}
      />

      {/* Formulario principal */}
      <FormShopping defaultValues={data} readOnly />
    </>
  );
};
export default ViewShopping;
