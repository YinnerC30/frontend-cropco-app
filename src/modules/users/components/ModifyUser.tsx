import { Separator } from '@/components';

import { ErrorLoading, Loading } from '@/modules/core/components';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetUser } from '../hooks/useGetUser';
import { usePatchUser } from '../hooks/usePatchUser';

import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useAuthenticationUser } from '../../authentication/hooks/useAuthenticationUser';
import { formSchemaUser } from '../utils';
import { removeAllActions } from '../utils/userSlice';
import { FormUser } from './FormUser';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isSuccess, isPending, data: dataPatch } = usePatchUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { updateUserActions } = useAuthenticationUser();

  const { actions } = useAppSelector((state: any): any => state.user);
  const user = useAppSelector((state: any): any => state.authentication.user);

  const onSubmit = (values: z.infer<typeof formSchemaUser>) => {
    const { password, ...rest } = values;
    mutate({
      ...rest,
      password: password.password1,
      id,
      actions: actions.map((ac: any) => ({
        id: ac,
      })),
    });
    dispatch(removeAllActions());
  };

  const updateNowUserActions = () => {
    updateUserActions(dataPatch?.modules);
  };

  if (isSuccess && id === user.id) {
    updateNowUserActions();
    navigate('../all');
  } else if (isSuccess) {
    navigate('../all');
  }

  if (isLoading) return <Loading />;
  if (!data) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: '/users/all', name: 'Usuarios' }]}
        finalItem={`Modificar`}
      />

      <Separator className="my-2" />

      <FormUser
        onSubmit={onSubmit}
        isPending={isPending}
        defaultValues={{
          ...data,
          password: {
            password1: '123456',
            password2: '123456',
          },
        }}
      />
    </>
  );
};
