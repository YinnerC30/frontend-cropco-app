import { Separator } from '@/components';
import { BreadCrumb } from '@/modules/core/components';
import { Loading } from '@/modules/core/components/Loading';
import { useParams } from 'react-router-dom';
import { useGetUser } from '../hooks';
import { FormUser } from './FormUser';

export const ViewUser = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetUser(id!);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: '/users/all', name: 'Usuarios' }]}
        finalItem={`Información del usuario`}
      />

      <Separator className="my-2" />

      <FormUser
        onSubmit={undefined}
        isPending={false}
        defaultValues={data}
        readOnly={true}
        hiddenPassword
      />
    </>
  );
};

export default ViewUser;
