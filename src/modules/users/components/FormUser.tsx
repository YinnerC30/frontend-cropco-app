import { Button, Input, ScrollArea } from '@/components';
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
import { ErrorLoading, Loading } from '@/modules/core/components';
import { ButtonsForm } from '@/modules/core/components/ButtonsForm';
import { FormFieldInput } from '@/modules/core/components/form/FormFieldInput';
import { useGetAllModules } from '@/modules/core/hooks/useGetAllModules';
import { FormProps } from '@/modules/core/interfaces/FormProps';
import { useAppDispatch } from '@/redux/store';
import { loadActions, updateActions } from '../utils/userSlice';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserForm } from '../hooks/useUserForm';
import { formFieldsUser } from '../utils';
import { removeAllActions } from '../utils/userSlice';
import { ActionUser } from './ActionUser';

export const FormUser = ({
  onSubmit,
  isPending,
  defaultValues,
  readOnly = false,
}: FormProps) => {
  const { showPassword, togglePasswordVisibility, form, userHaveAction } =
    useUserForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      dispatch(
        loadActions(
          defaultValues?.modules
            ?.map((i: any) => {
              return i.actions.map((ac: any) => ac.id);
            })
            .flat(1) ?? []
        )
      );
    }
  }, []);

  const { data = [], isLoading, isError, isSuccess } = useGetAllModules();

  const handleSelectAllActions = () => {
    const idsActionsModules = data
      .map((item: any) => item.actions.map((act: any) => act.id))
      .flat(1);

    for (const element of idsActionsModules) {
      dispatch(updateActions({ id: element, state: true }));
    }
  };

  const handleInselectAllActions = () => {
    dispatch(removeAllActions());
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    isSuccess && (
      <div className="flex flex-col items-center w-full ">
        <div className="flex items-center gap-2">
          <ScrollArea type="auto" className="h-[70vh] w-[40%] ">
            <h3 className="text-xl ">Datos personales:</h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="formUser"
                className="flex flex-row flex-wrap gap-4 p-2 justify-stretch"
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

                {!readOnly && (
                  <>
                    <FormField
                      control={form.control}
                      name={`password.password1`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            {formFieldsUser.password1.label}
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
                            <Button
                              onClick={(e) => togglePasswordVisibility(e)}
                            >
                              {showPassword ? (
                                <EyeOpenIcon />
                              ) : (
                                <EyeClosedIcon />
                              )}
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
                          <FormLabel>
                            {formFieldsUser.password2.label}
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
                            <Button
                              onClick={(e) => togglePasswordVisibility(e)}
                            >
                              {showPassword ? (
                                <EyeOpenIcon />
                              ) : (
                                <EyeClosedIcon />
                              )}
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

          <ScrollArea className="w-[60%] h-[70vh] mt-2">
            <h3 className="text-xl ">Permisos:</h3>
            <div className="flex gap-2 my-2">
              <Button onClick={handleSelectAllActions}>Marcar todo</Button>
              <Button onClick={handleInselectAllActions}>Desmarcar todo</Button>
            </div>
            <div className={'flex gap-2 my-2 flex-wrap'}>
              {data?.map(({ label, actions, name }: any) => {
                return (
                  <Card key={name} className="w-[45%] mb-2">
                    <CardHeader className="border-b">
                      <CardTitle className="capitalize ">{label}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-wrap gap-4 m-2 rounded-md">
                      {actions.map((act: any) => {
                        return (
                          <ActionUser
                            key={act.id}
                            action={act}
                            readOnly={readOnly}
                            isChecked={userHaveAction({ id: act.id })}
                          />
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {!readOnly && (
          <ButtonsForm
            actionToCancel={() => {
              dispatch(removeAllActions());
            }}
            isPending={isPending ?? false}
            formId={'formUser'}
            className={'flex w-48 gap-2 mt-2'}
          />
        )}

        {readOnly && (
          <Button
            className="my-2"
            onClick={() => {
              dispatch(removeAllActions());
              navigate(-1);
            }}
          >
            Volver
          </Button>
        )}
      </div>
    )
  );
};
