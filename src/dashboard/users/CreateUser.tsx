import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { defaultValues, formSchema } from './ElementsUserForm';
import { usePostUser } from './hooks/usePostUser';
import { useState } from 'react';

export const CreateUser = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (event: any) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isSuccess, isPending } = usePostUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { repeat_password, ...rest } = values;
    mutate(rest);
  };

  if (isSuccess) {
    navigate('../view');
  }

  return (
    <div className="">
      <Label className="text-2xl">Registro de usuario</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formUser"
            className="flex flex-col gap-2 ml-1"
          >
            <FormField
              key={'first_name'}
              control={form.control}
              name={'first_name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Nombre(s):'}</FormLabel>
                  <FormControl>
                    <Input className="w-56" placeholder={'Stiven'} {...field} />
                  </FormControl>
                  <FormDescription>{'Su primer nombre'}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'last_name'}
              control={form.control}
              name={'last_name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Apellido(s):'}</FormLabel>
                  <FormControl>
                    <Input className="w-56" placeholder={'Gomez'} {...field} />
                  </FormControl>
                  <FormDescription>{'Su primer apellido'}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'email'}
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Correo electrónico:'}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={'stivgome@google.com'}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {'Su correo electrónico personal'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'cell_phone_number'}
              control={form.control}
              name={'cell_phone_number'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Número celular:'}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={'3148009870'}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {'Su número celular personal'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'password'}
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Contraseña:'}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <Button onClick={e => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {'Escribe una contraseña segura'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'repeat_password'}
              control={form.control}
              name={'repeat_password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'Repite la contraseña:'}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormControl>
                    <Button onClick={e => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {'Vuelve a escribir la contraseña'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formUser" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Guardar
            </Button>
            <Button onClick={() => navigate(-1)}>Cancelar</Button>
          </div>
        </Form>
      </ScrollArea>
    </div>
  );
};
