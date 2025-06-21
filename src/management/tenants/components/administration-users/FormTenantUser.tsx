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
import { ToolTipTemplate } from '@/modules/core/components';

import { Cross2Icon } from '@radix-ui/react-icons';

import { Plus } from 'lucide-react';
import { memo, useState } from 'react';

import { formSchemaUserWithPassword } from '@/modules/users/utils';
import { z } from 'zod';
import { usePostTenantUser } from '../../hooks/mutations/usePostTenantUser';
import { FormTenantUserFields } from './FormTenantUserFields';
import { useCreateForm } from '@/modules/core/hooks';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  passwords: {
    password1: '',
    password2: '',
  },
};

export const FormTenantUser: React.FC<{ tenantId: string }> = memo(
  ({ tenantId }: { tenantId: string }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialogExtended = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setOpenDialog(true);
    };
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    const { mutate, isPending } = usePostTenantUser(tenantId);

    const form = useCreateForm({
      schema: formSchemaUserWithPassword,
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
      mutate(data);
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
                type="submit"
                form="formTenantUser"
                onClick={async () => {
                  const result = await form.trigger();
                  if (result) {
                    handleSubmit(form.watch());
                  }
                }}
              >
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
