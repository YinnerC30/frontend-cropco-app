import { Form } from '@/components';
import { ButtonsForm, FormFieldInput } from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks';
import { RootState, useAppSelector } from '@/redux/store';
import { z } from 'zod';
import { userPatchChangePasswordUser } from '../hooks/mutations';

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

export const FormChangePassword = () => {
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

  // const navigate = useNavigate();

  const { isPending, mutate } = userPatchChangePasswordUser();

  const handleSubmit = async (
    values: z.infer<typeof formSchemaChangePassword>
  ) => {
    mutate({ id, ...values });
  };

  const handleReturn = () => {
    console.log('Retornando...');
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          id="formChangePassword"
        >
          <FormFieldInput
            control={form.control}
            description={'Antigua contraseña que tenias'}
            label={'Vieja contraseña'}
            name={'old_password'}
            placeholder={'arrozconpollo1'}
            readOnly={false}
            type="password"
          />
          <FormFieldInput
            control={form.control}
            description={'Escribe una nueva contraseña'}
            label={'Nueva contraseña'}
            name={'new_password'}
            placeholder={'arrozconcarne1'}
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
  );
};
export default FormChangePassword;
