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
import { Supplier } from "@/modules/suppliers/interfaces/Supplier";
import { Supply } from "@/modules/supplies/interfaces/Supply";
import { useAppDispatch } from "@/redux/store";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { v4 as generateUUID } from "uuid";
import { z } from "zod";
import { usePurchaseDetailForm } from "../hooks/usePurchaseDetailForm";
import { formFieldsPurchaseDetail } from "../utils/formFieldsPurchaseDetail";
import { formSchemaPurchaseDetail } from "../utils/formSchemaPurchaseDetail";
import { add, calculateTotal } from "../utils/purchaseSlice";

export interface Props {
  isOpenDialogForm: boolean;
  setIsOpenDialogForm: any;
}
export const CreatePurchaseDetail = ({
  isOpenDialogForm,
  setIsOpenDialogForm,
}: Props) => {
  const dispatch = useAppDispatch();

  const { details, formPurchaseDetail, querySuppliers, querySupplies } =
    usePurchaseDetailForm();

  const onSubmitPurchaseDetail = async (
    values: z.infer<typeof formSchemaPurchaseDetail>
  ) => {
    dispatch(add([{ ...values, id: generateUUID() }]));
    dispatch(calculateTotal());
    formPurchaseDetail.reset();
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
            <DialogTitle>Agregar compra</DialogTitle>
            <DialogDescription className="">
              Cuando termines de agregar la información, puedes cerrar esta
              ventana.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario */}

          <Form {...formPurchaseDetail}>
            <form
              onSubmit={formPurchaseDetail.handleSubmit(onSubmitPurchaseDetail)}
              className="mx-5"
              id="formDetail"
            >
              <FormField
                key={"supply.id"}
                control={formPurchaseDetail.control}
                name={"supply.id"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsPurchaseDetail.supply.label}
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
                              : formFieldsPurchaseDetail.supply.placeholder}

                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
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
                                            formPurchaseDetail.setValue(
                                              "supply",
                                              supply!
                                            );
                                            formPurchaseDetail.trigger(
                                              "supply.id"
                                            );
                                          }}
                                        >
                                          <div className="flex justify-between w-40 ">
                                            <span>{`${supply.name}`}</span>
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
                      {formFieldsPurchaseDetail.supply.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"supplier.id"}
                control={formPurchaseDetail.control}
                name={"supplier.id"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsPurchaseDetail.supplier.label}
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
                              ? querySuppliers.data.rows.find(
                                  (item: Supplier) => item.id === field.value
                                )?.first_name
                              : formFieldsPurchaseDetail.supplier.placeholder}

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
                                Proveedor no encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {querySuppliers.data.rows &&
                                  Array.isArray(querySuppliers.data.rows) &&
                                  querySuppliers.data.rows.map(
                                    (supplier: Supplier | any) => {
                                      const isIncludes = details.some(
                                        (item: any) =>
                                          item.supplier.id === supplier.id
                                      );
                                      if (isIncludes) return;
                                      return (
                                        <CommandItem
                                          value={supplier.first_name}
                                          key={supplier.id!}
                                          onSelect={() => {
                                            formPurchaseDetail.setValue(
                                              "supplier",
                                              supplier!
                                            );
                                            formPurchaseDetail.trigger(
                                              "supplier.id"
                                            );
                                          }}
                                        >
                                          {supplier.first_name}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              supplier.id! === field.value
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
                      {formFieldsPurchaseDetail.supplier.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"amount"}
                control={formPurchaseDetail.control}
                name={"amount"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsPurchaseDetail.amount.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={
                          formFieldsPurchaseDetail.amount.placeholder
                        }
                        min={0}
                        type="number"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsPurchaseDetail.amount.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"total"}
                control={formPurchaseDetail.control}
                name={"total"}
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormLabel className="block">
                      {formFieldsPurchaseDetail.total.label}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={formFieldsPurchaseDetail.total.placeholder}
                        type="number"
                        min={0}
                        step={50}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {formFieldsPurchaseDetail.total.description}
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
                formPurchaseDetail.reset();
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
