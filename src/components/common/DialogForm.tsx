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
        <Button className='mt-2 ml-10' variant="secondary">{name}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Asegúrate de rellenar todos los campos a continuación
          </DialogDescription>
        </DialogHeader>
        <ScrollArea type='auto' className="w-auto h-auto max-h-96">
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
