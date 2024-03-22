import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface DialogProps {
  children: any;
  name?: any;
}

export function DialogForm({ children, name }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Asegúrate de rellenar todos los campos a continuación
          </DialogDescription>
        </DialogHeader>
        <ScrollArea
          style={{
            width: '400px',
            height: '300px',
          }}
        >
          {children}
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="formTemplate">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
