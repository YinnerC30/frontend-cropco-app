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
import { Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { DataResetPassword } from '../../hooks/mutations';

interface Props {
  id: string;
  mutation: any;
}

export function ActionResetPassword({ id, mutation }: Props) {
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const { mutate, isPending } = mutation;

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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <KeyRound className="w-4 h-4 mr-2" /> Contraseña
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
            <DialogClose asChild>
              <Button variant={'destructive'}>Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
}
