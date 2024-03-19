import { useGetUserByIdQuery, useUpdateUserMutation } from '@/services/cropco';
import { useNavigate, useParams } from 'react-router-dom';
import { UserForm } from './UserForm';

import { z } from 'zod';
import { formSchema } from './ElementsForm';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);

  const navigation = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUser({ id, values });
    navigation('../');
  };

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <UserForm
          values={data}
          nameButtonSubmit="Actualizar"
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
