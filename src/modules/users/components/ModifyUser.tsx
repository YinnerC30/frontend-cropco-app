import { Separator } from '@/components';

import { Loading } from '@/modules/core/components';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetUser, usePatchUser } from '../hooks/';

import { BreadCrumb } from '@/modules/core/components/';
import { RootState, useAppSelector } from '@/redux/store';
import { formSchemaUser } from '../utils';
import { FormUser } from './FormUser';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id!);
  const { mutate, isPending } = usePatchUser();

  const { actions } = useAppSelector((state: RootState): any => state.user);

  const onSubmit = (values: z.infer<typeof formSchemaUser>) => {
    mutate({
      ...values,
      id,
      actions: actions.map((actionId: string) => ({
        id: actionId,
      })),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <FormUser
        onSubmit={onSubmit}
        isPending={isPending}
        defaultValues={data}
        hiddenPassword
      />
    </>
  );
};

export default ModifyUser;
