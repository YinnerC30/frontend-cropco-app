import { Loading } from '@/modules/core/components/shared/Loading';
import { useParams } from 'react-router-dom';
import { useGetUser } from '../hooks';
import { FormUser } from './FormUser';
import { BreadCrumb } from '@/modules/core/components';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';

export const ViewUser = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetUser(id!);

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
