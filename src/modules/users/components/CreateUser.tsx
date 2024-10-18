import { Separator } from '@/components';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { usePostUser } from '../hooks/usePostUser';
import { formSchemaUser } from '../utils';
import { FormUser } from './FormUser';
import { useUserAuthorizationActions } from '../hooks/useUserAuthorizationActions';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {
  const { authorizationActions } = useUserAuthorizationActions();
  const navigate = useNavigate();

  console.log(authorizationActions);

  if (!authorizationActions?.create_user?.visible) {
    console.log('No tienes permiso');
    navigate(-1);
  }
  const { mutate, isPending } = usePostUser();

  const { actions } = useAppSelector((state: any) => state.user);

  const onSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    const { passwords, ...rest } = values;
    mutate({
      ...rest,
      password: passwords.password1,
      actions: actions.map((act: any) => ({ id: act })),
    });
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: '/users/all', name: 'Usuarios' }]}
        finalItem={'Registro'}
      />
      <Separator className="my-2" />
      <FormUser onSubmit={onSubmit} isPending={isPending} />
    </>
  );
};
