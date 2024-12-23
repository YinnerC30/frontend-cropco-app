import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import { useGetClient } from '../hooks/queries/useGetClient';
import { usePatchClient } from '../hooks/mutations/usePatchClient';
import { MODULE_CLIENTS_PATHS } from '../routes/pathRoutes';
import { formSchemaClient } from '../utils';
import FormClient from './form/FormClient';

export const ModifyClient:React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);
  const { mutate, isPending } = usePatchClient();

  const onSubmit = (values: z.infer<typeof formSchemaClient>) => {
    mutate({ id, ...values });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CLIENTS_PATHS.ViewAll, name: 'Clientes' }]}
        finalItem={`Modificar`}
      />

      <FormClient
        onSubmit={onSubmit}
        isSubmitting={isPending}
        defaultValues={data}
      />
    </>
  );
};

export default ModifyClient;
