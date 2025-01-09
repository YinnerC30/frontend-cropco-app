import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { useGetConsumption } from '../hooks/queries/useGetConsumption';

import { BreadCrumb } from '@/modules/core/components/';
import { MODULE_CONSUMPTION_PATHS } from '../routes/pathRoutes';
import { FormConsumption } from './forms/consumption/FormConsumption';

export const ViewConsumption: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetConsumption(id!);

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CONSUMPTION_PATHS.ViewAll, name: 'Consumos' }]}
        finalItem={`Información del consumo`}
      />
      <FormConsumption defaultValues={data} readOnly />
    </>
  );
};
export default ViewConsumption;
