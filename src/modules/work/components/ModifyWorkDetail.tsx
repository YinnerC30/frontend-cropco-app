import { useAppDispatch } from "@/redux/store";
import { useWorkDetailForm } from "../hooks/useWorkDetailForm";
import { useEffect } from "react";
import { formSchemaWorkDetails } from "../utils/formSchemaWorkDetails";

import { calculateTotal, modify } from "../utils/workSlice";
import { toast } from "sonner";

import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import { cn } from "@/lib/utils";
import { Client } from "@/modules/clients/interfaces/Client";
import { formFieldsWorkDetails } from "../utils/formFieldsWorkDetails";
import { z } from "zod";
import { Employee } from "@/modules/employees/interfaces/Employee";

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
  const { details, queryEmployees, formWorkDetail } = useWorkDetailForm();

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
              <DialogTitle>Agregar trabajo</DialogTitle>
              <DialogDescription className="">
                Cuando termines de agregar la información, puedes cerrar esta
                ventana.
              </DialogDescription>
            </DialogHeader>

            {/* Formulario */}

            <Form {...formWorkDetail}>
              <form
                onSubmit={formWorkDetail.handleSubmit(onSubmitWorkDetail)}
                className="mx-5"
                id="formDetail"
              >
                <FormField
                  key={"employee.id"}
                  control={formWorkDetail.control}
                  name={"employee.id"}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className="block">
                        {formFieldsWorkDetails.first_name.label}
                      </FormLabel>

                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? queryEmployees?.data?.rows.find(
                                    (item: Client) => item.id === field.value
                                  )?.first_name
                                : formFieldsWorkDetails.first_name.placeholder}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Buscar cliente..."
                              className="h-9"
                            />
                            <CommandList>
                              <ScrollArea className="w-auto h-56">
                                <CommandEmpty>
                                  Cliente no encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {queryEmployees?.data?.rows &&
                                    Array.isArray(queryEmployees.data.rows) &&
                                    queryEmployees.data.rows.map(
                                      (employee: Employee) => {
                                        const isIncludes = details.some(
                                          (item: any) =>
                                            item.employee.id === employee.id
                                        );
                                        if (isIncludes) return;
                                        return (
                                          <CommandItem
                                            value={employee.first_name}
                                            key={employee.id!}
                                            onSelect={() => {
                                              formWorkDetail.setValue(
                                                "employee",
                                                {
                                                  id: employee.id,
                                                  first_name:
                                                    employee.first_name,
                                                }!
                                              );
                                              formWorkDetail.trigger(
                                                "employee.id"
                                              );
                                            }}
                                          >
                                            {employee.first_name}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                employee.id! === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        );
                                      }
                                    )}
                                </CommandGroup>
                              </ScrollArea>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormDescription>
                        {formFieldsWorkDetails.first_name.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={"value_pay"}
                  control={formWorkDetail.control}
                  name={"value_pay"}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className="block">
                        {formFieldsWorkDetails.value_pay.label}
                      </FormLabel>

                      <FormControl>
                        <Input
                          className="w-80"
                          placeholder={formFieldsWorkDetails.value_pay.label}
                          min={0}
                          type="number"
                          {...field}
                          onChange={(e) => {
                            return !Number.isNaN(e.target.value)
                              ? field.onChange(parseFloat(e.target.value))
                              : 0;
                          }}
                          step={50}
                        />
                      </FormControl>

                      <FormDescription>
                        {formFieldsWorkDetails.value_pay.description}
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
                  formWorkDetail.reset();
                  setDialogOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" form="formDetail">
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
