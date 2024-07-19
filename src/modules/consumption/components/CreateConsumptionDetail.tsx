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
import { toast } from "sonner";
import { v4 as generateUUID } from "uuid";
import { z } from "zod";
import { useConsumptionDetailForm } from "../hooks/useConsumptionDetailForm";
import { add } from "../utils/consumptionSlice";
import { formFieldsConsumptionDetail } from "../utils/formFieldsConsumptionDetail";
import { formSchemaConsumptionDetail } from "../utils/formSchemaConsumptionDetail";

export interface Props {
  isOpenDialogForm: boolean;
  setIsOpenDialogForm: any;
}
export const CreateConsumptionDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: Props) => {
  const dispatch = useAppDispatch();

  const { details, formConsumptionDetails, queryCrops, querySupplies } =
    useConsumptionDetailForm();

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

          <Form {...formConsumptionDetails}>
            <form
              onSubmit={formConsumptionDetails.handleSubmit(
                onSubmitConsumptionDetail
              )}
              className="mx-5"
              id="formDetail"
            >
              {/* TODO: Arreglar selector de stock de insumo */}
              <FormField
                key={"supply.id"}
                control={formConsumptionDetails.control}
                name={"supply.id"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsConsumptionDetail.supply.label}
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
                              ? querySupplies.data?.rows.find(
                                  (item: Supply) => item.id === field.value
                                )?.name
                              : formFieldsConsumptionDetail.supply.placeholder}

                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[280px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar cultivo..."
                            className="h-9"
                          />
                          <CommandList>
                            <ScrollArea className="w-auto h-56">
                              <CommandEmpty>
                                Cultivo no encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {querySupplies.data?.rows &&
                                  Array.isArray(querySupplies.data?.rows) &&
                                  querySupplies.data?.rows.map(
                                    (supply: Supply | any) => {
                                      const isIncludes = details.some(
                                        (item: any) =>
                                          item.supply.id === supply.id
                                      );
                                      if (isIncludes) return;
                                      return (
                                        <CommandItem
                                          value={`${supply.name}`}
                                          key={supply.id!}
                                          onSelect={() => {
                                            formConsumptionDetails.setValue(
                                              "supply",
                                              supply!
                                            );
                                            formConsumptionDetails.trigger(
                                              "supply.id"
                                            );
                                          }}
                                        >
                                          <div className="flex justify-between w-[220px] ">
                                            <span>{`${supply.name}`}</span>
                                            <span className="font-semibold">{`${supply.amount} ${supply.unit_of_measure}`}</span>
                                          </div>
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              supply.id! === field.value
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
                      {formFieldsConsumptionDetail.supply.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TODO: Arreglar selector de cultivo */}
              <FormField
                key={"crop.id"}
                control={formConsumptionDetails.control}
                name={"crop.id"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsConsumptionDetail.crop.label}
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
                              ? queryCrops.data.rows.find(
                                  (item: Crop) => item.id === field.value
                                )?.name
                              : formFieldsConsumptionDetail.crop.placeholder}

                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar proveedor..."
                            className="h-9"
                          />
                          <CommandList>
                            <ScrollArea className="w-auto h-56">
                              <CommandEmpty>
                                Cultivo no encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {queryCrops.data.rows &&
                                  Array.isArray(queryCrops.data.rows) &&
                                  queryCrops.data.rows.map(
                                    (crop: Crop | any) => {
                                      const isIncludes = details.some(
                                        (item: any) => item.crop.id === crop.id
                                      );
                                      if (isIncludes) return;
                                      return (
                                        <CommandItem
                                          value={crop.name}
                                          key={crop.id!}
                                          onSelect={() => {
                                            formConsumptionDetails.setValue(
                                              "crop",
                                              crop!
                                            );
                                            formConsumptionDetails.trigger(
                                              "crop.id"
                                            );
                                          }}
                                        >
                                          {`${crop.name}`}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              crop.id! === field.value
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
                      {formFieldsConsumptionDetail.crop.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"amount"}
                control={formConsumptionDetails.control}
                name={"amount"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsConsumptionDetail.amount.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={
                          formFieldsConsumptionDetail.amount.placeholder
                        }
                        min={0}
                        type="number"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsConsumptionDetail.amount.description}
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
                formConsumptionDetails.reset();
                setIsOpenDialogForm(false);
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
  );
};
