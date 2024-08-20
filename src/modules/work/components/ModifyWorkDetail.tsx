import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useWorkDetailForm } from "../hooks/useWorkDetailForm";
import { formSchemaWorkDetails } from "../utils/formSchemaWorkDetails";

import { toast } from "sonner";
import { calculateTotal, modify } from "../utils/workSlice";

import { Cross2Icon } from "@radix-ui/react-icons";

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
import { z } from "zod";
import { FormWorkDetail } from "./form/FormWorkDetail";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}
export const ModifyWorkDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();
  const { formWorkDetail } = useWorkDetailForm();

  useEffect(() => {
    formWorkDetail.reset(defaultValues);
  }, []);

  const onSubmitWorkDetail = (
    values: z.infer<typeof formSchemaWorkDetails>
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
    <>
      <div>
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

            {/* Formulario */}

            <FormWorkDetail
              onSubmit={onSubmitWorkDetail}
              defaultValues={defaultValues}
            />

            <DialogFooter>
              <Button
                variant={"destructive"}
                onClick={() => {
                  formWorkDetail.reset();
                  setDialogOpen(false);
                  afterEffect(false);
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
    </>
  );
};
