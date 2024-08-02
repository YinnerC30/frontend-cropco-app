import { Button } from "@/components/ui/button";

import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";

import { CheckIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { calculateTotal, modify } from "../utils/harvestSlice";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Employee } from "@/modules/employees/interfaces/Employee";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { z } from "zod";
import { useHarvestDetailForm } from "../hooks/useHarvestDetailForm";
import { formFieldsHarvestDetail, formSchemaHarvestDetail } from "../utils";
import { FormHarvestDetails } from "./forms/FormHarvestDetails";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}

export const ModifyHarvestDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();
  const { formHarvestDetail } = useHarvestDetailForm();

  const onSubmitHarvestDetail = (
    values: z.infer<typeof formSchemaHarvestDetail>
  ) => {
    const oldEmployee = {
      id: defaultValues.employee.id,
    };

    dispatch(
      modify({
        detail: values,
        oldEmployee,
      })
    );
    dispatch(calculateTotal());
    toast.success("Registro actualizado");
    setDialogOpen(false);
    afterEffect && afterEffect(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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

        <FormHarvestDetails
          onSubmit={onSubmitHarvestDetail}
          defaultValues={defaultValues}
        />

        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              formHarvestDetail.reset();
              setDialogOpen(false);
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
  );
};
