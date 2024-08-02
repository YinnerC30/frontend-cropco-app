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
import { useHarvestDetailForm } from "../hooks/useHarvestDetailForm";
import { formSchemaHarvestDetail } from "../utils";
import { add, calculateTotal } from "../utils/harvestSlice";
import { FormHarvestDetails } from "./forms/FormHarvestDetails";

export const CreateHarvestDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: any) => {
  const dispatch = useAppDispatch();

  const { formHarvestDetail } = useHarvestDetailForm();

  const onSubmitHarvestDetail = async (
    values: z.infer<typeof formSchemaHarvestDetail>
  ) => {
    dispatch(
      add([
        {
          ...values,
        },
      ])
    );
    dispatch(calculateTotal());
    toast.success("Registro añadido");
    setIsOpenDialogForm(false);
  };

  return (
    <div>
      <Dialog open={isOpenDialogForm} onOpenChange={setIsOpenDialogForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose
            onClick={() => setIsOpenDialogForm(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Agregar cosecha empleado</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          <FormHarvestDetails onSubmit={onSubmitHarvestDetail} />

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                formHarvestDetail.reset();
                setIsOpenDialogForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" form="formHarvestDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
