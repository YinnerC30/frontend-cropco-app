import { z } from 'zod';

import { usePostClient } from '../hooks/mutations/usePostClient';

import { BreadCrumb } from '@/modules/core/components';
import { formSchemaClient } from '../utils';
import FormClient from './FormClient/FormClient';
import { MODULE_CLIENTS_PATHS } from '../routes/pathRoutes';

export const CreateClient = () => {
  const { mutate, isPending } = usePostClient();

  const onSubmit = async (values: z.infer<typeof formSchemaClient>) => {
    mutate(values);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CLIENTS_PATHS.ViewAll, name: 'Clientes' }]}
        finalItem={`Registro`}
      />

      <FormClient onSubmit={onSubmit} isSubmitting={isPending} />
    </>
  );
};

export default CreateClient;
