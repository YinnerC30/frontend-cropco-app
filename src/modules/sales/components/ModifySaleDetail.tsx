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
import { Client } from "@/modules/clients/interfaces/Client";
import { HarvestStock } from "@/modules/harvests/interfaces/HarvestStock";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { z } from "zod";
import { useSaleDetailForm } from "../hooks/useSaleDetailForm";
import { formFieldsSaleDetail } from "../utils/formFieldsSaleDetail";
import { formSchemaSaleDetail } from "../utils/formSchemaSaleDetail";
import { calculateTotal, modify } from "../utils/saleSlice";

interface Props {
  defaultValues: any;
  isDialogOpen: boolean;
  setDialogOpen: any;
  afterEffect?: any;
}

export const ModifySaleDetail = ({
  isDialogOpen,
  setDialogOpen,
  defaultValues,
  afterEffect,
}: Props) => {
  const dispatch = useAppDispatch();
  const { details, queryClients, queryHarvestStock, formSaleDetail } =
    useSaleDetailForm();

  useEffect(() => {
    formSaleDetail.reset(defaultValues);
  }, []);

  const onSubmitSaleDetail = (values: z.infer<typeof formSchemaSaleDetail>) => {
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

        <Form {...formSaleDetail}>
          <form
            onSubmit={formSaleDetail.handleSubmit(onSubmitSaleDetail)}
            className="mx-5"
            id="formDetail"
          >
            <FormField
              key={"crop.id"}
              control={formSaleDetail.control}
              name={"crop.id"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsSaleDetail.crop.label}
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
                            ? queryHarvestStock.data?.rows.find(
                                (item: HarvestStock) => item.id === field.value
                              )?.name
                            : formFieldsSaleDetail.crop.placeholder}

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
                            <CommandEmpty>Cultivo no encontrado.</CommandEmpty>
                            <CommandGroup>
                              {queryHarvestStock.data?.rows &&
                                Array.isArray(queryHarvestStock.data?.rows) &&
                                queryHarvestStock.data?.rows.map(
                                  (crop: HarvestStock | any) => {
                                    const isIncludes = details.some(
                                      (item: any) => item.crop.id === crop.id
                                    );
                                    if (isIncludes) return;
                                    return (
                                      <CommandItem
                                        value={`${crop.name}`}
                                        key={crop.id!}
                                        onSelect={() => {
                                          formSaleDetail.setValue(
                                            "crop",
                                            crop!
                                          );
                                          formSaleDetail.trigger("crop.id");
                                        }}
                                      >
                                        <div className="flex justify-between w-40 ">
                                          <span>{`${crop.name}`}</span>
                                          <span className="font-semibold">{`${crop.stock}`}</span>
                                        </div>
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
                    {formFieldsSaleDetail.first_name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={"client.id"}
              control={formSaleDetail.control}
              name={"client.id"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsSaleDetail.first_name.label}
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
                            ? queryClients.data.rows.find(
                                (item: Client) => item.id === field.value
                              )?.first_name
                            : formFieldsSaleDetail.first_name.placeholder}

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
                            <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                            <CommandGroup>
                              {queryClients.data.rows &&
                                Array.isArray(queryClients.data.rows) &&
                                queryClients.data.rows.map(
                                  (client: Client | any) => {
                                    const isIncludes = details.some(
                                      (item: any) =>
                                        item.client.id === client.id
                                    );
                                    if (isIncludes) return;
                                    return (
                                      <CommandItem
                                        value={client.first_name}
                                        key={client.id!}
                                        onSelect={() => {
                                          formSaleDetail.setValue(
                                            "client",
                                            client!
                                          );
                                          formSaleDetail.trigger("client.id");
                                        }}
                                      >
                                        {client.first_name}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            client.id! === field.value
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
                    {formFieldsSaleDetail.first_name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={"quantity"}
              control={formSaleDetail.control}
              name={"quantity"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsSaleDetail.quantity.label}
                  </FormLabel>

                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder={formFieldsSaleDetail.quantity.label}
                      min={0}
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormDescription>
                    {formFieldsSaleDetail.quantity.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={"total"}
              control={formSaleDetail.control}
              name={"total"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsSaleDetail.total.label}
                  </FormLabel>

                  <FormControl>
                    <Input
                      className="w-80"
                      placeholder={formFieldsSaleDetail.total.placeholder}
                      {...field}
                      type="number"
                      min={0}
                      step={50}
                    />
                  </FormControl>

                  <FormDescription>
                    {formFieldsSaleDetail.total.description}
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
              formSaleDetail.reset();
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
  );
};