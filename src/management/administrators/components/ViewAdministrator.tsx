import { BreadCrumb } from '@/modules/core/components';
import { Loading } from '@/modules/core/components/shared/Loading';
import { useParams } from 'react-router-dom';
import { useGetAdministrator } from '../hooks/queries/useGetAdministrator';
import { MODULE_ADMINISTRATORS_PATHS } from '../routes/pathsRoutes';
import { FormAdministrator } from './form/FormAdministrator';

export const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetAdministrator(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[
          {
            link: MODULE_ADMINISTRATORS_PATHS.ViewAll,
            name: 'Administradores',
          },
        ]}
        finalItem={`Información`}
      />
      <FormAdministrator
        onSubmit={undefined}
        isSubmitting={false}
        defaultValues={data}
        readOnly
        hiddenPassword
      />
    </>
  );
};

export default ViewUser;
