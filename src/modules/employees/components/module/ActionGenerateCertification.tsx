import { DropdownMenuItem, ScrollArea } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useDataTableMenuActionsContext,
  useFormChange,
} from '@/modules/core/components';
import { useCreateForm } from '@/modules/core/hooks';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { ShieldPlus } from 'lucide-react';
import { z } from 'zod';
import { MutationVariables } from '../../hooks/mutations/usePostCertificationEmployee';
import { EmployeeCertification } from '../../interfaces/EmployeeCertification';
import { formSchemaEmployeeCertification } from '../../utils/formSchemaEmployeeCertification';
import { FormEmployeeCertification } from './form/FormEmployeeCertification';

interface Props {
  employeeId: string;
  mutation: UseMutationReturn<Blob, MutationVariables>;
  disabled: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
}

const defaultValuesCertification: EmployeeCertification = {
  generator_name: '',
  generator_position: '',
  company_name: '',
  start_date: new Date(),
  employee_position: '',
  weekly_working_hours: 0,
};

export function ActionGenerateCertification({
  employeeId,
  mutation,
  disabled,
  handleCloseDialog,
  handleOpenDialog,
}: Props) {
  const { mutate, isPending } = mutation;

  const { toggleOpen } = useDataTableMenuActionsContext();

  const { hasUnsavedChanges } = useFormChange();

  const form = useCreateForm({
    schema: formSchemaEmployeeCertification,
    defaultValues: defaultValuesCertification,
  });

  const handleCloseDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    handleCloseDialog();
    if (!hasUnsavedChanges) {
      toggleOpen(false);
    }
  };

  const handleSubmitCertification = (
    values: z.infer<typeof formSchemaEmployeeCertification>
  ) => {
    mutate(
      { employeeId, data: { ...values } },
      {
        onSuccess: () => {
          handleCloseDialog();
          toggleOpen(false);
        },
      }
    );
  };

  return (
    <>
      <DialogTrigger asChild>
        <DropdownMenuItem disabled={disabled} asChild>
          <Button onClick={() => handleOpenDialog()} variant="ghost">
            <ShieldPlus className="w-4 h-4 mr-2" /> Certificar
          </Button>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
        onDoubleClick={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
        forceMount={true}
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogClose asChild>
          <DialogPrimitive.Close
            onClick={(e) => {
              e.preventDefault();
              handleCloseDialogExtended(e);
            }}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Generar certificación a empleado</DialogTitle>
          <DialogDescription>
            A continuación rellene la información correspondiente
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] w-full py-2">
          <FormEmployeeCertification formEmployeeCertification={form} />
        </ScrollArea>

        <DialogFooter>
          <Button
            onClick={form.handleSubmit(handleSubmitCertification)}
            disabled={isPending}
          >
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Generar
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
