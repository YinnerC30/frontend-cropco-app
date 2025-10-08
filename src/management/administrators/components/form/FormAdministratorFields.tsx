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

import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { useState } from 'react';
import { useFormAdministratorContext } from '../../hooks/context/useFormAdministratorContext';
import { RolesAdministrator } from '../../interfaces/RolesAdministrator';
import { formFieldsAdministrator } from '../../utils/formFieldsAdministrator';

export const FormAdministratorFields: React.FC = () => {
  const { form, onSubmit, readOnly, hiddenPassword } =
    useFormAdministratorContext();

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
          id="formAdministrator"
          className="flex flex-row flex-wrap gap-4 p-2 justify-stretch md:w-full"
        >
          <FormFieldInput
            autoFocus
            control={form.control}
            description={formFieldsAdministrator.first_name.description}
            label={formFieldsAdministrator.first_name.label}
            name={'first_name'}
            placeholder={formFieldsAdministrator.first_name.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsAdministrator.last_name.description}
            label={formFieldsAdministrator.last_name.label}
            name={'last_name'}
            placeholder={formFieldsAdministrator.last_name.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsAdministrator.email.description}
            label={formFieldsAdministrator.email.label}
            name={'email'}
            placeholder={formFieldsAdministrator.email.placeholder}
            disabled={readOnly}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsAdministrator.cell_phone_number.description}
            label={formFieldsAdministrator.cell_phone_number.label}
            name={'cell_phone_number'}
            placeholder={formFieldsAdministrator.cell_phone_number.placeholder}
            disabled={readOnly}
          />

          <FormFieldSelect
            items={[
              {
                key: RolesAdministrator.ADMIN,
                value: RolesAdministrator.ADMIN,
                label: 'Administrador',
              },
              {
                key: RolesAdministrator.USER,
                value: RolesAdministrator.USER,
                label: 'Usuario',
              },
            ]}
            control={form.control}
            description={formFieldsAdministrator.role.description}
            label={formFieldsAdministrator.role.label}
            name={'role'}
            placeholder={formFieldsAdministrator.role.placeholder}
            disabled={readOnly}
          />

          {!hiddenPassword && (
            <>
              <FormField
                control={form.control}
                name={'passwords.password1'}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {formFieldsAdministrator.password1.label}
                    </FormLabel>
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
                      {formFieldsAdministrator.password1.description}
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
                    <FormLabel>
                      {formFieldsAdministrator.password2.label}
                    </FormLabel>
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
                      {formFieldsAdministrator.password2.description}
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
