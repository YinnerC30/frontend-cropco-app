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
import { formSchemaSaleDetail } from "../utils/formSchemaSaleDetail";
import { add, calculateTotal } from "../utils/saleSlice";
import { FormSaleDetail } from "./forms/FormSaleDetail";

export const CreateSaleDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: any) => {
  const dispatch = useAppDispatch();

  const onSubmitSaleDetail = async (
    values: z.infer<typeof formSchemaSaleDetail>
  ) => {
    dispatch(add([{ ...values, id: generateUUID() }]));
    dispatch(calculateTotal());
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
            <DialogTitle>Agregar venta</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <FormSaleDetail onSubmit={onSubmitSaleDetail} />

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                setIsOpenDialogForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" form="formSaleDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
