import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/components';
import { ToolTipTemplate, useFormChange } from '@/modules/core/components';

import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';

import { Plus } from 'lucide-react';
import { memo, useState } from 'react';

import { RolesAdministrator } from '@/management/administrators/interfaces/RolesAdministrator';
import { useCreateForm } from '@/modules/core/hooks';
import { formSchemaUserWithPassword } from '@/modules/users/utils';
import { z } from 'zod';
import { usePostTenantUser } from '../../hooks/mutations/usePostTenantUser';
import { formSchemaTenantUser } from '../../utils/formSchemaTenantUser';
import { FormTenantUserFields } from './FormTenantUserFields';

export const defaultValues = {
  first_name: 'Usuario',
  last_name: 'Mantenimiento',
  email: 'usermant@mail.com',
  cell_phone_number: '3146573245',
  passwords: {
    password1: '123456',
    password2: '123456',
  },
  roles: [RolesAdministrator.USER],
};

export const FormTenantUser: React.FC<{ tenantId: string }> = memo(
  ({ tenantId }: { tenantId: string }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const { showToast } = useFormChange();

    const handleOpenDialogExtended = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setOpenDialog(true);
    };
    const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (form.formState.isDirty) {
        showToast({
          skipRedirection: true,
          action: (): void => {
            form.reset();
            setOpenDialog(false);
          },
        });

        return;
      }
      form.reset();
      setOpenDialog(false);
    };

    const { mutate, isPending } = usePostTenantUser(tenantId);

    const form = useCreateForm({
      schema: formSchemaTenantUser,
      defaultValues: { ...defaultValues },
      validationMode: 'onChange',
    });

    const handleSubmit = (
      values: z.infer<typeof formSchemaUserWithPassword>
    ) => {
      const { passwords, ...rest } = values as any;
      const data = {
        ...rest,
        password: passwords.password1,
      };
      mutate(data, {
        onSuccess: () => {
          form.reset();
          setOpenDialog(false);
        },
      });
    };

    const handleOnClickButton = async () => {
      const result = await form.trigger();
      if (result) {
        handleSubmit(form.watch());
      }
    };

    return (
      <div>
        <ToolTipTemplate content={'Crear registro'}>
          <Button
            className={`bg-primary/70 hover:bg-primary/50`}
            size="icon"
            onClick={handleOpenDialogExtended}
            disabled={false}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Crear nuevo registro</span>
          </Button>
        </ToolTipTemplate>

        <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={false}>
          <DialogContent
            className="sm:max-w-[425px] h-[85vh] overflow-hidden"
            onClick={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogClose
              onClick={handleCloseDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <Cross2Icon className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Usuario de Inquilino</DialogTitle>
              <DialogDescription className="">
                Ingrese los datos solicitados para crear un usuario
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center">
              <ScrollArea className="h-[60vh] w-full py-2">
                <FormTenantUserFields onSubmit={handleSubmit} form={form} />
              </ScrollArea>
            </div>

            <DialogFooter>
              <Button
                disabled={isPending}
                type="button"
                form="formTenantUser"
                onClick={handleOnClickButton}
              >
                {isPending && (
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                )}
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
