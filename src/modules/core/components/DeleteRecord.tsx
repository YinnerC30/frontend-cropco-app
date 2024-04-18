import { Button } from "@/components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { TrashIcon } from "@radix-ui/react-icons";
export const DeleteRecord = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro de eliminar el registro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es irreversible y no podrá recuperar su registro
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button /* onClick={() => handleDelete()} */>Continuar</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
