import { ErrorLoading, Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';
import { useGetSupply } from '../hooks/';
import { MODULE_SUPPLIES_PATHS } from '../routes/pathRoutes';
import { FormSupply } from './FormSupply/FormSupply';

export const ViewSupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIES_PATHS.ViewAll, name: 'Suministros' }]}
        finalItem={`Información del suministro`}
      />

      <FormSupply defaultValues={data} readOnly />
    </>
  );
};
export default ViewSupply;
