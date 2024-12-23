import { useParams } from 'react-router-dom';

import { BreadCrumb } from '@/modules/core/components/';
import { useGetClient } from '../hooks/queries/useGetClient';
import { MODULE_CLIENTS_PATHS } from '../routes/pathRoutes';
import { FormClient } from './form';
import { Loading } from '@/modules/core/components';

export const ViewClient: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CLIENTS_PATHS.ViewAll, name: 'Clientes' }]}
        finalItem={`Información del cliente`}
      />

      <FormClient defaultValues={data} readOnly />
    </>
  );
};

export default ViewClient;
