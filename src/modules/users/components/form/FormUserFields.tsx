import { useFormUserContext } from '../../hooks';

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { formFieldsUser } from '../../utils';
import { FormFieldInput } from '@/modules/core/components';
import { useState } from 'react';

export const FormUserFields: React.FC = () => {
  const { form, onSubmit, readOnly, hiddenPassword } = useFormUserContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h3 className="text-xl">Datos personales:</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="formUser"
          className="flex flex-row flex-wrap gap-4 p-2 justify-stretch md:w-full"
        >
          <FormFieldInput
            autoFocus
            control={form.control}
            description={formFieldsUser.first_name.description}
            label={formFieldsUser.first_name.label}
            name={'first_name'}
            placeholder={formFieldsUser.first_name.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.last_name.description}
            label={formFieldsUser.last_name.label}
            name={'last_name'}
            placeholder={formFieldsUser.last_name.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.email.description}
            label={formFieldsUser.email.label}
            name={'email'}
            placeholder={formFieldsUser.email.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.cell_phone_number.description}
            label={formFieldsUser.cell_phone_number.label}
            name={'cell_phone_number'}
            placeholder={formFieldsUser.cell_phone_number.placeholder}
            disabled={readOnly}
          />

          {!hiddenPassword && (
            <>
              <FormField
                control={form.control}
                name={'passwords.password1'}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{formFieldsUser.password1.label}</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          className="w-56"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          readOnly={readOnly}
                        />
                      </FormControl>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    </div>
                    <FormDescription>
                      {formFieldsUser.password1.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'passwords.password2'}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{formFieldsUser.password2.label}</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          className="w-56"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          readOnly={readOnly}
                        />
                      </FormControl>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </Button>
                    </div>
                    <FormDescription>
                      {formFieldsUser.password2.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
    </div>
  );
};
