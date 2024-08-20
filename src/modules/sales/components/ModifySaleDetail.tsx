import { Button } from "@/components/ui/button";

import { Cross2Icon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";
import { formSchemaSaleDetail } from "../utils/formSchemaSaleDetail";
import { calculateTotal, modify } from "../utils/saleSlice";
import { FormSaleDetail } from "./forms/FormSaleDetail";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}

export const ModifySaleDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmitSaleDetail = (values: z.infer<typeof formSchemaSaleDetail>) => {
    dispatch(
      modify({
        detail: { ...values, id: defaultValues.id },
      })
    );
    dispatch(calculateTotal());
    toast.success("Registro actualizado");
    setDialogOpen(false);
    afterEffect && afterEffect(false);
  };

  console.log(defaultValues);
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose
          onClick={() => setDialogOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <Cross2Icon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Modificar</DialogTitle>
          <DialogDescription>
            Cuando termines de modificar la información, puedes cerrar esta
            ventana.
          </DialogDescription>
        </DialogHeader>

        <FormSaleDetail
          onSubmit={onSubmitSaleDetail}
          defaultValues={{ ...defaultValues }}
        />

        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              setDialogOpen(false);
              afterEffect(false);
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
  );
};
