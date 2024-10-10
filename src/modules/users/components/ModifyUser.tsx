import { Separator } from '@/components';

import { ErrorLoading, Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetUser } from '../hooks/useGetUser';
import { usePatchUser } from '../hooks/usePatchUser';

import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { useAppSelector } from '@/redux/store';
import { formSchemaUser } from '../utils';
import { FormUser } from './FormUser';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isPending } = usePatchUser();

  const { actions } = useAppSelector((state: any): any => state.user);

  const onSubmit = (values: z.infer<typeof formSchemaUser>) => {
    const { passwords: password, ...rest } = values;
    mutate({
      ...rest,
      password: password.password1,
      id,
      actions: actions.map((ac: any) => ({
        id: ac,
      })),
    });
  };

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
