import { Button } from "@/components";
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
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";

import { formSchemaShoppingDetail } from "../utils/formSchemaShoppingDetail";
import { calculateTotal, modify } from "../utils/shoppingSlice";
import { FormShoppingDetail } from "./forms/FormShoppingDetail";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}
export const ModifyShoppingDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmitShoppingDetail = async (
    values: z.infer<typeof formSchemaShoppingDetail>
  ) => {
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
  return (
    <div>
      <Dialog open={isDialogOpen} modal={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose
            onClick={() => setDialogOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Modificar compra</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <FormShoppingDetail
            onSubmit={onSubmitShoppingDetail}
            defaultValues={defaultValues}
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
            <Button type="submit" form="formShoppingDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
