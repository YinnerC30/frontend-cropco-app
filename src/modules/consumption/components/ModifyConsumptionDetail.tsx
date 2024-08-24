import {
  Button,
  Command,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  ScrollArea,
} from "@/components";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Crop } from "@/modules/crops/interfaces/Crop";
import { Supply } from "@/modules/supplies/interfaces/Supply";
import { useAppDispatch } from "@/redux/store";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useConsumptionDetailForm } from "../hooks/useConsumptionDetailForm";
import { modify } from "../utils/consumptionSlice";
import { formFieldsConsumptionDetail } from "../utils/formFieldsConsumptionDetail";
import { formSchemaConsumptionDetail } from "../utils/formSchemaConsumptionDetail";
import { FormConsumptionDetail } from "./FormConsumptionDetail";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}
export const ModifyConsumptionDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();

  const { formConsumptionDetails } = useConsumptionDetailForm();

  useEffect(() => {
    formConsumptionDetails.reset(defaultValues);
  }, []);

  const onSubmitConsumptionDetail = async (
    values: z.infer<typeof formSchemaConsumptionDetail>
  ) => {
    dispatch(
      modify({
        detail: { ...values, id: defaultValues.id },
      })
    );
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
            <DialogTitle>Modificar consumo</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <FormConsumptionDetail
            onSubmit={onSubmitConsumptionDetail}
            defaultValues={{ ...defaultValues }}
          />

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                formConsumptionDetails.reset();
                setDialogOpen(false);
                afterEffect(false);
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
