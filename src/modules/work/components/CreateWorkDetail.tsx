import { Cross2Icon } from "@radix-ui/react-icons";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
import { v4 as generateUUID } from "uuid";
import { useWorkDetailForm } from "../hooks/useWorkDetailForm";

import { formSchemaWorkDetails } from "../utils/formSchemaWorkDetails";
import { add, calculateTotal } from "../utils/workSlice";
import { FormWorkDetail } from "./form/FormWorkDetail";

export const CreateWorkDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: any) => {
  const dispatch = useAppDispatch();

  const { formWorkDetail } = useWorkDetailForm();

  const onSubmitWorkDetail = async (
    values: z.infer<typeof formSchemaWorkDetails>
  ) => {
    dispatch(add([{ ...values, id: generateUUID() }]));
    dispatch(calculateTotal());
    formWorkDetail.reset();
    toast.success("Registro añadido");
    setIsOpenDialogForm(false);
  };

  return (
    <div>
      <Dialog open={isOpenDialogForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose
            onClick={() => setIsOpenDialogForm(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Agregar trabajo</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <FormWorkDetail onSubmit={onSubmitWorkDetail} />

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                formWorkDetail.reset();
                setIsOpenDialogForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" form="formWorkDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
