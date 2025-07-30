import { Input, Label, ScrollArea } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateForm } from '@/modules/core/hooks';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { MutationVariables } from '../../hooks/mutations/usePostCertificationEmployee';
import { EmployeeCertification } from '../../interfaces/EmployeeCertification';
import { formSchemaEmployeeCertification } from '../../utils/formSchemaEmployeeCertification';
import { FormEmployeeCertification } from './form/FormEmployeeCertification';
import { Employee } from '../../interfaces/Employee';
import { useFormChange } from '@/modules/core/components';

interface Props {
  employeeId: string;
  mutation: UseMutationReturn<Blob, MutationVariables>;
  disabled: boolean;
  handleCloseDialog: () => void;
  employee: Partial<Employee>;
}

const defaultValuesCertification: EmployeeCertification = {
  generator_name: '',
  generator_position: '',
  company_name: '',
  start_date: new Date(),
  employee_position: '',
  weekly_working_hours: 0,
  id_number: '',
};

export function ActionGenerateCertification({
  employeeId,
  mutation,
  disabled,
  handleCloseDialog,
  employee,
}: Props) {
  const { mutate, isPending } = mutation;
  

  const form = useCreateForm({
    schema: formSchemaEmployeeCertification,
    defaultValues: defaultValuesCertification,
  });

  const handleCloseDialogExtended = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    handleCloseDialog();
  };

  const handleSubmitCertification = (
    values: z.infer<typeof formSchemaEmployeeCertification>
  ) => {
    mutate(
      { employeeId, data: { ...values } },
      {
        onSuccess: () => {
          setTimeout(() => {
            handleCloseDialog();
          }, 1000);
        },
      }
    );
  };

  return (
    <>
      <DialogContent
        className="sm:max-w-[425px] max-w-[95vw]"
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
        onDoubleClick={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
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
          <div className="pl-1 my-2">
            <Label>Empleado:</Label>
            <Input
              value={employee.first_name + ' ' + employee.last_name}
              className="w-auto"
              disabled
            />
          </div>
          <FormEmployeeCertification
            formEmployeeCertification={form}
            // employee={employee}
          />
        </ScrollArea>

        <DialogFooter>
          <Button
            onClick={form.handleSubmit(handleSubmitCertification)}
            disabled={isPending}
            data-testid={'btn-generate-certificate'}
            type='submit'
          >
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Generar
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
