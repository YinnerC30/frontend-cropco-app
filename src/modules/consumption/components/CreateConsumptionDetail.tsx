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
import { v4 as generateUUID } from "uuid";
import { z } from "zod";
import { useConsumptionDetailForm } from "../hooks/useConsumptionDetailForm";
import { add } from "../utils/consumptionSlice";
import { formSchemaConsumptionDetail } from "../utils/formSchemaConsumptionDetail";
import { FormConsumptionDetail } from "./forms/FormConsumptionDetail";


export interface Props {
  isOpenDialogForm: boolean;
  setIsOpenDialogForm: any;
}
export const CreateConsumptionDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: Props) => {
  const dispatch = useAppDispatch();

  const { formConsumptionDetails } = useConsumptionDetailForm();

  const onSubmitConsumptionDetail = async (
    values: z.infer<typeof formSchemaConsumptionDetail>
  ) => {
    dispatch(add([{ ...values, id: generateUUID() }]));
    formConsumptionDetails.reset();
    toast.success("Registro añadido");
    setIsOpenDialogForm(false);
  };
  return (
    <div>
      <Dialog open={isOpenDialogForm} modal={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose
            onClick={() => setIsOpenDialogForm(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none hover:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Agregar consumo</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <FormConsumptionDetail onSubmit={onSubmitConsumptionDetail} />

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                formConsumptionDetails.reset();
                setIsOpenDialogForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" form="formConsumptionDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
