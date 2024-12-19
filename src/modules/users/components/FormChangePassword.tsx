import { Form } from '@/components';
import { BreadCrumb, ButtonsForm } from '@/modules/core/components';
import { FormFieldInputPassword } from '@/modules/core/components/form/fields/FormFieldInputPassword';
import { useCreateForm } from '@/modules/core/hooks';
import { RootState, useAppSelector } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { userPatchChangePasswordUser } from '../hooks/mutations';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';

const formSchemaChangePassword = z.object({
  old_password: z
    .string({ required_error: 'La contraseña antigua es obligatoria' })
    .min(6, {
      message: 'La contraseña debe tener mínimo 6 caracteres',
    })
    .max(100, {
      message: `La contraseña debe tener máximo 100 caracteres`,
    }),
  new_password: z
    .string({ required_error: 'La contraseña nueva es obligatoria' })
    .min(6, {
      message: 'La contraseña debe tener mínimo 6 caracteres',
    })
    .max(100, {
      message: `La contraseña debe tener máximo 100 caracteres`,
    }),
});

export const FormChangePassword: React.FC = () => {
  const { id } = useAppSelector(
    (state: RootState) => state.authentication.user
  );
  const form = useCreateForm({
    schema: formSchemaChangePassword,
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });

  const navigate = useNavigate();

  const { isPending, mutate } = userPatchChangePasswordUser();

  const handleSubmit = async (
    values: z.infer<typeof formSchemaChangePassword>
  ) => {
    mutate({ id, ...values });
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_USER_PATHS.ViewAll, name: 'Usuarios' }]}
        finalItem={`Cambio de contraseña`}
      />
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center p-10 border rounded-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              id="formChangePassword"
              className="flex flex-col gap-4"
            >
              <FormFieldInputPassword
                control={form.control}
                description={'Introduce la contraseña que tienes ahora'}
                label={'Contraseña actual'}
                name={'old_password'}
                placeholder={''}
                readOnly={false}
                type="password"
              />
              <FormFieldInputPassword
                control={form.control}
                description={'Introduce la nueva contraseña que deseas'}
                label={'Nueva contraseña'}
                name={'new_password'}
                placeholder={''}
                readOnly={false}
                type="password"
              />
            </form>
          </Form>

          <ButtonsForm
            actionToCancel={handleReturn}
            isPending={isPending}
            formId="formChangePassword"
            className="flex w-48 gap-2 mt-2"
          />
        </div>
      </div>
    </>
  );
};
export default FormChangePassword;
