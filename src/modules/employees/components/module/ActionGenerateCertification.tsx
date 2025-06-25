import { DropdownMenuItem } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDataTableMenuActionsContext } from '@/modules/core/components';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { KeyRound, ShieldPlus } from 'lucide-react';
import { useState } from 'react';
import { EmployeeCertification } from '../../interfaces/EmployeeCertification';
import { MutationVariables } from '../../hooks/mutations/usePostCertificationEmployee';

interface Props {
  id: string;
  mutation: UseMutationReturn<Blob, MutationVariables>;
  disabled: boolean;
  data: EmployeeCertification;
}

export function ActionGenerateCertification({
  id,
  mutation,
  disabled,
  data,
}: Props) {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = mutation;

  const handleSubmit = () => {
    mutate(data as any);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    toggleOpen(false);
  };

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen} modal={open}>
      <DialogTrigger asChild>
        <DropdownMenuItem disabled={disabled} asChild>
          <Button onClick={() => handleOpenDialog()} variant="ghost">
            <ShieldPlus className="w-4 h-4 mr-2" /> Certificado
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
      >
        <DialogClose asChild>
          <DialogPrimitive.Close
            onClick={handleCloseDialog}
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

        <div>
          <h1>Hola este es un certificado</h1>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isPending}>
            Generar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
