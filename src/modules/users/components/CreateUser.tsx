import { Separator } from '@/components';
import { RootState, useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { usePostUser } from '../hooks';
import { formSchemaUserWithPassword } from '../utils';
import { FormUser } from './FormUser';

export const CreateUser = () => {
  const { mutate, isPending } = usePostUser();

  const { actions } = useAppSelector((state: RootState) => state.user);

  const onSubmit = async (
    values: z.infer<typeof formSchemaUserWithPassword>
  ) => {
    const { passwords, ...rest } = values;
    mutate({
      ...rest,
      password: passwords.password1,
      actions: actions.map((act: any) => ({ id: act })),
    });
  };

  return (
    <>
      <FormUser onSubmit={onSubmit} isPending={isPending} />
    </>
  );
};

export default CreateUser;
