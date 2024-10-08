import { Separator } from '@/components';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { usePostUser } from '../hooks/usePostUser';
import { formSchemaUser } from '../utils';
import { FormUser } from './FormUser';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { removeAllActions } from '../utils/userSlice';

export const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isSuccess, isPending } = usePostUser();

  const { actions } = useAppSelector((state: any) => state.user);

  const onSubmit = async (values: z.infer<typeof formSchemaUser>) => {
    const { password, ...rest } = values;
    mutate({
      ...rest,
      password: password.password1,
      actions: actions.map((act: any) => ({ id: act })),
    });
    dispatch(removeAllActions());
  };

  isSuccess && navigate('../all');

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
