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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading, ToolTipTemplate } from '@/modules/core/components';
import { useDataTableMenuActionsContext } from '@/modules/core/components/DataTable';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { DataResetPassword } from '../../hooks/mutations';

interface Props {
  id: string;
  mutation: any;
}

export function ActionResetPassword({ id, mutation }: Props) {
  const { toggleOpen } = useDataTableMenuActionsContext();
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const { mutate, isPending } = mutation;

  const handleCloseDialog = () => {
    setOpen(false);
    toggleOpen(false);
  };

  const handleResetPassword = () => {
    mutate(id, {
      onSuccess: (data: DataResetPassword) => {
        setNewPassword(data.password);
      },
    });
  };

  const handleCopyToClipboard = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      toast.success('Contraseña copiada al portapapeles');
    }
  };

  return (
    <DropdownMenuItem>
      <Dialog
        defaultOpen={false}
        open={open}
        onOpenChange={setOpen}
        modal={open}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="ghost">
            <KeyRound className="w-4 h-4 mr-2" /> Contraseña
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={(event) => {
            event.preventDefault();
          }}
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
            <DialogTitle>Restablecimiento de contraseña</DialogTitle>
            <DialogDescription>
              La contraseña del usuario será reemplazada por otra.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4">
            {isPending ? (
              <Loading />
            ) : (
              <>
                <Label htmlFor="password" className="text-right">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  value={newPassword || ''}
                  readOnly
                  className="w-56"
                  placeholder="1234..."
                />
                <ToolTipTemplate content="Copiar nueva contraseña">
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={handleCopyToClipboard}
                    disabled={!newPassword}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </ToolTipTemplate>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleResetPassword} disabled={isPending}>
              Restablecer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
}
