import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

import { Button, Form } from '@/components';
import { FormFieldInput } from '@/modules/core/components';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { useCreateForm } from '@/modules/core/hooks';
import { RootState, useAppSelector } from '@/redux/store';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { z } from 'zod';
import { DataChangePassword } from '../hooks/mutations';

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

interface Props {
  id: string;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  mutate: UseMutateFunction<
    AxiosResponse<void, any>,
    AxiosError<TypedAxiosError, unknown>,
    DataChangePassword,
    unknown
  >;
}

export const DialogChangePassword: React.FC<Props> = ({
  handleCloseDialog,
  setOpenDialog,
  isPending,
  mutate,
  id,
}) => {
  const form = useCreateForm({
    schema: formSchemaChangePassword,
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchemaChangePassword>) => {
    mutate({ id, ...values }, { onSuccess: () => setOpenDialog(false) });
  };

  return (
    <DialogContent
      forceMount={true}
      className="sm:max-w-[425px]"
      onInteractOutside={(event) => {
        event.preventDefault();
      }}
    >
      <DialogClose asChild>
        <DialogPrimitive.Close
          onClick={(e) => {
            handleCloseDialog(e);
          }}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Cross2Icon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogClose>

      <DialogHeader>
        <DialogTitle>Cambio de contraseña</DialogTitle>
        <DialogDescription>
          A continuación siga las instrucciónes del formulario
        </DialogDescription>
      </DialogHeader>
      <div className="select-none">
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
              placeholder={'antiguacontraseña'}
              disabled={false}
              type="password"
            />
            <FormFieldInput
              control={form.control}
              description={'Escribe una nueva contraseña'}
              label={'Nueva contraseña'}
              name={'new_password'}
              placeholder={'nuevacontraseña'}
              disabled={false}
              type="password"
            />
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button type="submit" form={'formChangePassword'} disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
