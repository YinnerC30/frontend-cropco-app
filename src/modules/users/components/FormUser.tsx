import { Button, Input, ScrollArea, Separator } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ButtonsForm,
  FormFieldInput,
  Loading,
} from '@/modules/core/components';
import { FormProps } from '@/modules/core/interfaces';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useUserForm } from '../hooks';
import { MODULE_USER_PATHS } from '../routes/pathsRoutes';
import { formFieldsUser } from '../utils';
import { ActionUser } from './ActionUser';
import { useAuthorization } from '@/modules/authentication/hooks';
import { AlertAction } from '@/modules/core/components/AlertAction';
import {
  Action,
  Module,
} from '@/modules/core/interfaces/ResponseGetAllModules';

interface FormUserProps extends FormProps {
  hiddenPassword?: boolean;
}

export const FormUser = ({
  defaultValues,
  hiddenPassword = false,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormUserProps) => {
  const {
    data,
    form,
    handleInselectAllActions,
    handleInselectAllActionsInModule,
    handleSelectAllActionInModule,
    handleSelectAllActions,
    isLoadingModules,
    removeAllActionsUser,
    showPassword,
    togglePasswordVisibility,
    userHasAction,
  } = useUserForm({ hiddenPassword, formValues: defaultValues });
  const navigate = useNavigate();

  const { hasPermission } = useAuthorization();

  const handleReturnToModule = () => {
    removeAllActionsUser();
    navigate(MODULE_USER_PATHS.ViewAll);
  };

  if (isLoadingModules) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center ">
      <ScrollArea className="h-[72vh] w-full pb-2">
        {!hasPermission('users', 'find_one_user') && (
          <AlertAction
            title={'Error'}
            description={
              'Requieres del permiso de lectura para obtener la información del usuario solicitado'
            }
          />
        )}

        <h3 className="text-xl ">Datos personales:</h3>

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
              control={form.control}
              description={formFieldsUser.cell_phone_number.description}
              label={formFieldsUser.cell_phone_number.label}
              name={'cell_phone_number'}
              placeholder={formFieldsUser.cell_phone_number.placeholder}
              readOnly={readOnly}
            />

            {!hiddenPassword && (
              <>
                <FormField
                  control={form.control}
                  name={`passwords.password1`}
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
                  name={`passwords.password2`}
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

        <Separator className="my-5" />
        <h3 className="text-xl ">Permisos:</h3>
        <div
          className={`flex gap-2 my-2  items-center justify-center ${
            readOnly && 'hidden'
          }`}
        >
          <Button onClick={handleSelectAllActions}>Marcar todo</Button>
          <Button onClick={handleInselectAllActions}>Desmarcar todo</Button>
        </div>
        <div className={'flex gap-2 my-2 flex-wrap justify-evenly'}>
          {data?.map(({ label, actions, name }: Module) => {
            return (
              <Card key={name} className="mb-2 w-72">
                <CardHeader className="border-b">
                  <CardTitle className="capitalize ">{label}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-wrap gap-4 m-2 rounded-md">
                  <Button
                    variant={'ghost'}
                    onClick={() => handleSelectAllActionInModule(name)}
                  >
                    Marcar todo
                  </Button>
                  <Button
                    variant={'ghost'}
                    onClick={() => handleInselectAllActionsInModule(name)}
                  >
                    Desmarcar todo
                  </Button>
                  {actions.map((action: Action) => {
                    return (
                      <ActionUser
                        key={action.id}
                        action={action}
                        readOnly={readOnly}
                        isChecked={userHasAction({ id: action.id })}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {readOnly ? (
        <Button className="my-2" onClick={handleReturnToModule}>
          Volver
        </Button>
      ) : (
        <ButtonsForm
          actionToCancel={handleReturnToModule}
          isPending={isSubmitting}
          formId={'formUser'}
          className={'flex w-48 gap-2 mt-2'}
        />
      )}
    </div>
  );
};
