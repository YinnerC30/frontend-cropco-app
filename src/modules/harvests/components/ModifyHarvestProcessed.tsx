import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateForm } from "@/modules/core/hooks/useCreateForm";

import { Calendar, Popover } from "@/components";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { usePatchHarvestProcessed } from "../hooks/usePatchHarvestProcessed";
import { formFieldsHarvestProcessed } from "../utils/formFieldsHarvestProcessed";
import { formSchemaHarvestProcessed } from "../utils/formSchemaHarvestProcessed";

export const ModifyHarvestProcessed = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
  defaultValues,
  afterEffect
}: any) => {
  console.log(defaultValues);
  const formProcessed = useCreateForm({
    schema: formSchemaHarvestProcessed,
    defaultValues: {
      ...defaultValues,
      date: new Date(`${defaultValues.date}T00:00:00-05:00`),
    },
  });

  const { mutate, isSuccess } = usePatchHarvestProcessed();

  const onSubmitHarvestProcessed = async (
    values: z.infer<typeof formSchemaHarvestProcessed>
  ) => {
    const { crop, harvest, id } = defaultValues;

    mutate({
      ...values,
      crop: { id: crop.id },
      harvest: { id: harvest.id },
      id,
    });
  };

  if (isSuccess) {
    setIsOpenDialogForm(false);
    afterEffect(false);
  }

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
            <DialogTitle>Modificar cosecha procesada</DialogTitle>
            <DialogDescription className="">
              Cuando termines de modificar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          <Form {...formProcessed}>
            <form
              onSubmit={formProcessed.handleSubmit(onSubmitHarvestProcessed)}
              className="mx-5"
              id="formProcessed"
            >
              <FormField
                control={formProcessed.control}
                name={`date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formFieldsHarvestProcessed.date.label}
                    </FormLabel>

                    <div className="block">
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            locale={es}
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            // initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormDescription>
                      {formFieldsHarvestProcessed.date.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"total"}
                control={formProcessed.control}
                name={"total"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsHarvestProcessed.total.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={
                          formFieldsHarvestProcessed.total.placeholder
                        }
                        {...field}
                        type="number"
                        min={0}
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsHarvestProcessed.total.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                formProcessed.reset();
                setIsOpenDialogForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" form="formProcessed">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
