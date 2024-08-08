import { Button, Dialog, Form } from "@/components";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useEffect } from "react";
import { formFieldsHarvestProcessed } from "../../utils/formFieldsHarvestProcessed";
import { CreateFormSchemaHarvestProcessed } from "../../utils/formSchemaHarvestProcessed";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";

interface FormHarvestProcessedProps extends FormProps {
  dateHarvest: string | Date;
  isOpenDialogForm: boolean;
  setIsOpenDialogForm: (state: Boolean) => void;
  isPending: boolean;
  dialogTitle: string;
  dialogDescription: string;
}
export const FormHarvestProcessed = ({
  defaultValues,
  onSubmit,
  dateHarvest,
  isOpenDialogForm,
  setIsOpenDialogForm,
  isPending,
  dialogTitle,
  dialogDescription,
}: FormHarvestProcessedProps) => {
  const formSchemaHarvestProcessed =
    CreateFormSchemaHarvestProcessed(dateHarvest);

  const formProcessed = useCreateForm({
    schema: formSchemaHarvestProcessed,
    defaultValues: {
      date: undefined,
      total: undefined,
    },
  });

  useEffect(() => {
    defaultValues && formProcessed.reset(defaultValues);
  }, []);

  return (
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
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...formProcessed}>
          <form
            onSubmit={formProcessed.handleSubmit(onSubmit)}
            className="mx-5"
            id="formProcessed"
          >
            <FormFieldCalendar
              control={formProcessed.control}
              description={formFieldsHarvestProcessed.date.description}
              label={formFieldsHarvestProcessed.date.label}
              name={"date"}
              placeholder={formFieldsHarvestProcessed.date.placeholder}
              readOnly={false}
            />
            <FormFieldInput
              control={formProcessed.control}
              description={formFieldsHarvestProcessed.total.description}
              label={formFieldsHarvestProcessed.total.label}
              name={"total"}
              placeholder={formFieldsHarvestProcessed.total.placeholder}
              readOnly={false}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              setIsOpenDialogForm(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" form="formProcessed" disabled={isPending}>
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
