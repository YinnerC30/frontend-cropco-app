import { FormTemplate } from '@/components/form/FormTemplate';
import { z } from 'zod';

export const UserForm = () => {
  const formSchema = z.object({
    first_name: z.string().min(2, {
      message: 'Nombre debe tener al menos 2 caracteres',
    }),
    last_name: z.string().min(4, {
      message: 'Apellido debe tener al menos 4 caracteres',
    }),
    email: z.string().email('El correo electrónico es incorrecto'),
    cell_phone_number: z
      .string()
      .min(10, {
        message: 'El número celular debe tener solo 10 dígitos',
      })
      .max(10, 'El número celular debe tener solo 10 dígitos'),

    password: z.string().min(6, {
      message: 'La contraseña debe tener mínimo 6 caracteres',
    }),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    cell_phone_number: '',
    password: '',
  };

  const formFields = [
    {
      name: 'first_name',
      label: 'Nombre:',
      placeholder: '',
      description: '',
    },
    {
      name: 'last_name',
      label: 'Apellido:',
      placeholder: '',
      description: '',
    },
    {
      name: 'email',
      label: 'Correo electrónico:',
      placeholder: '',
      description: '',
    },
    {
      name: 'cell_phone_number',
      label: 'Número celular:',
      placeholder: '',
      description: '',
    },
    {
      name: 'password',
      label: 'Contraseña:',
      placeholder: '',
      description: '',
    },
  ];

  return (
    <>
      <FormTemplate
        formSchema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        formFields={formFields}
      />
    </>
  );
};
