import { Loading } from '@/modules/core/components';
import { z } from 'zod';
import { useGetUser, usePatchUser } from '../hooks/';

import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { formSchemaUser } from '../utils';
import { FormUser } from './form';

export const ModifyUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    query: { data, isLoading },
  } = useGetUser(id!);
  const { mutate, isPending } = usePatchUser();

  const handleSubmit = (values: z.infer<typeof formSchemaUser>) => {
    mutate({ id: id ?? undefined, ...values });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Modificar`}
      />

      <FormUser
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        defaultValues={data}
        hiddenPassword
        showAlert
      />
    </>
  );
};

export default ModifyUser;
