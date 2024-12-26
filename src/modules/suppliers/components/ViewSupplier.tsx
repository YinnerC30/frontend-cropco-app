import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetSupplier } from '../hooks/queries/useGetSupplier';
import { MODULE_SUPPLIER_PATHS } from '../routes/pathRoutes';
import { FormSupplier } from './form/FormSupplier';

export const ViewSupplier: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIER_PATHS.ViewAll, name: 'Proveedores' }]}
        finalItem={`Información del proveedor`}
      />

      <FormSupplier defaultValues={data} readOnly />
    </>
  );
};

export default ViewSupplier;
