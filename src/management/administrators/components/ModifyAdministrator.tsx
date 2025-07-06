import { Loading } from '@/modules/core/components';
import { z } from 'zod';

import { BreadCrumb } from '@/modules/core/components/';
import { useParams } from 'react-router-dom';
import { MODULE_ADMINISTRATORS_PATHS } from '../routes/pathsRoutes';
import { FormAdministrator } from './form/FormAdministrator';
import { Administrator } from '../interfaces/Administrator';
import { formSchemaAdministrator } from '../utils/formSchemaAdministrator';
import { ModifyUser } from '@/modules/users/components';
import { usePatchAdministrator } from '../hooks/mutations/usePatchAdministrator';
import { useGetAdministrator } from '../hooks/queries/useGetAdministrator';

export const ModifyAdministrator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetAdministrator(id!);
  const { mutate, isPending } = usePatchAdministrator();

  const handleSubmit = (values: z.infer<typeof formSchemaAdministrator>) => {
    mutate({ id: id ?? undefined, ...values } as Partial<Administrator>);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <BreadCrumb
        items={[
          {
            link: MODULE_ADMINISTRATORS_PATHS.ViewAll,
            name: 'Administradores',
          },
        ]}
        finalItem={`Modificar`}
      />

      <FormAdministrator
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        defaultValues={data}
        hiddenPassword
      />
    </>
  );
};

export default ModifyAdministrator;
