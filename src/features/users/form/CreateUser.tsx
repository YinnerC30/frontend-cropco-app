import { useCreateUserMutation } from '@/services/cropco';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { formSchema } from './ElementsUserForm';
import { UserForm } from './UserForm';

export const CreateUser = () => {
  const navigation = useNavigate();
  const [createUser] = useCreateUserMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUser(values);
    navigation('../');
  };

  return (
    <>
      <UserForm nameButtonSubmit="Crear" onSubmit={onSubmit} />
    </>
  );
};
