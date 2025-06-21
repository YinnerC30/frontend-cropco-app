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
import {
  formFieldsUser,
  formSchemaUserWithPassword,
} from '@/modules/users/utils';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { RolesAdministrator } from '@/management/administrators/interfaces/RolesAdministrator';
import { formFieldsAdministrator } from '@/management/administrators/utils/formFieldsAdministrator';

interface Props {
  form: UseFormReturn<any, any, undefined>;
  onSubmit: (values: z.infer<typeof formSchemaUserWithPassword>) => void;
}

export const FormTenantUserFields: React.FC<Props> = ({
  onSubmit,
  form,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={() => {
          //   console.log('Entro');
          //   form.trigger();
          //   form.handleSubmit((data) => {
          //     onSubmit(data);
          //   });
          // }}
          id="formTenantUser"
          className="flex flex-row flex-wrap gap-4 p-2 justify-stretch md:w-full"
        >
          <FormFieldInput
            autoFocus
            control={form.control}
            description={formFieldsUser.first_name.description}
            label={formFieldsUser.first_name.label}
            name={'first_name'}
            placeholder={formFieldsUser.first_name.placeholder}
            disabled={false}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.last_name.description}
            label={formFieldsUser.last_name.label}
            name={'last_name'}
            placeholder={formFieldsUser.last_name.placeholder}
            disabled={false}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.email.description}
            label={formFieldsUser.email.label}
            name={'email'}
            placeholder={formFieldsUser.email.placeholder}
            disabled={false}
          />
          <FormFieldInput
            control={form.control}
            description={formFieldsUser.cell_phone_number.description}
            label={formFieldsUser.cell_phone_number.label}
            name={'cell_phone_number'}
            placeholder={formFieldsUser.cell_phone_number.placeholder}
            disabled={false}
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
            disabled={false}
          />

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
                        readOnly={false}
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
                        readOnly={false}
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
        </form>
      </Form>
    </div>
  );
};
