import { Button, Input, ScrollArea } from '@/components';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonsForm } from '@/modules/core/components/ButtonsForm';
import { FormFieldInput } from '@/modules/core/components/form/FormFieldInput';
import { FormProps } from '@/modules/core/interfaces/FormProps';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserForm } from '../hooks/useUserForm';
import { formFieldsUser } from '../utils';
import { UpdateUserActions } from './UpdateUserActions';

export const FormUser = ({
  onSubmit,
  isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const { showPassword, togglePasswordVisibility, form } = useUserForm();
  const navigate = useNavigate();

  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="flex items-center gap-2">
        <ScrollArea type="auto" className="h-[70vh] w-2/4 ">
          <h3 className="text-xl ">Datos personales:</h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="formUser"
              className="flex flex-row flex-wrap gap-4 p-2 justify-stretch"
            >
              <FormFieldInput
                control={form.control}
                description={formFieldsUser.first_name.description}
                label={formFieldsUser.first_name.label}
                name={'first_name'}
                placeholder={formFieldsUser.first_name.placeholder}
                readOnly={readOnly}
              />
              <FormFieldInput
                control={form.control}
                description={formFieldsUser.last_name.description}
                label={formFieldsUser.last_name.label}
                name={'last_name'}
                placeholder={formFieldsUser.last_name.placeholder}
                readOnly={readOnly}
              />
              <FormFieldInput
                control={form.control}
                description={formFieldsUser.email.description}
                label={formFieldsUser.email.label}
                name={'email'}
                placeholder={formFieldsUser.email.placeholder}
                readOnly={readOnly}
              />
              <FormFieldInput
                // className="w-full"
                control={form.control}
                description={formFieldsUser.cell_phone_number.description}
                label={formFieldsUser.cell_phone_number.label}
                name={'cell_phone_number'}
                placeholder={formFieldsUser.cell_phone_number.placeholder}
                readOnly={readOnly}
              />

              {!readOnly && (
                <>
                  <FormField
                    control={form.control}
                    name={`password.password1`}
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
                          <Button onClick={(e) => togglePasswordVisibility(e)}>
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
                    name={`password.password2`}
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
                          <Button onClick={(e) => togglePasswordVisibility(e)}>
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
        </ScrollArea>

        <ScrollArea className="w-2/4 h-[70vh] mt-2">
          <h3 className="text-xl ">Permisos:</h3>
          <UpdateUserActions className={'mt-2'} />
        </ScrollArea>
      </div>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending ?? false}
          formId={'formUser'}
          className={'flex w-48 gap-2 mt-2'}
        />
      )}

      {readOnly && (
        <Button className="my-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      )}
    </div>
  );
};
