import { Button, Form } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormFieldInput } from '@/modules/core/components/form/fields/FormFieldInput';
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { formFieldsLogin, formSchemaLogin } from '../utils';

import { PATH_HOME_APP } from '@/config';
import { useCreateForm } from '@/modules/core/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginUser } from '../hooks/mutations/useLoginUser';

export const Login: React.FC = () => {
  const formLogin = useCreateForm({
    schema: formSchemaLogin,
    defaultValues: {
      email: 'yinnerchilito@example.com',
      password: '123456',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const { mutate, isPending } = useLoginUser();

  const onSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
    mutate(values);
  };

  const { email, password } = formFieldsLogin;

  return (
    <div className="flex items-center justify-center h-screen max-w-sm mx-auto space-y-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Inicio de sesión
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Ingresa tu usuario y contraseña para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formLogin}>
            <form
              onSubmit={formLogin.handleSubmit(onSubmit)}
              id="formLogin"
              className="flex flex-col gap-4 mt-4"
            >
              <FormFieldInput
                control={formLogin.control}
                description={email.description}
                label={email.label}
                name={'email'}
                placeholder={email.placeholder}
                readOnly={false}
              />

              <FormFieldInput
                control={formLogin.control}
                description={password.description}
                label={password.label}
                name={'password'}
                placeholder={password.placeholder}
                readOnly={false}
                type={showPassword ? 'text' : 'password'}
              >
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="p-2"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Button>
              </FormFieldInput>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button
            type="submit"
            form="formLogin"
            className="mt-4 w-28"
            disabled={isPending}
          >
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Ingresar
          </Button>
          <Link to={PATH_HOME_APP}>Ir a Home</Link>
          <Link to={'/'}>Ir a Root</Link>
        </CardFooter>
      </Card>
    </div>
  );
};
