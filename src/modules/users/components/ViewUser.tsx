import { BreadCrumb } from '@/modules/core/components';
import { Loading } from '@/modules/core/components/shared/Loading';
import { useParams } from 'react-router-dom';
import { useGetUser } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { FormUser } from './form';

export const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    query: { isLoading, data },
  } = useGetUser(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Información`}
      />
      <FormUser
        onSubmit={undefined}
        isSubmitting={false}
        defaultValues={data}
        readOnly
        hiddenPassword
        showAlert
      />
    </>
  );
};

export default ViewUser;
