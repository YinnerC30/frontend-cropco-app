import {
  Button,
  Calendar,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
} from "@/components";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ButtonCancelRegister,
  ErrorLoading,
  Loading,
} from "@/modules/core/components";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { usePostSale } from "../hooks";
import { useSaleForm } from "../hooks/useSaleForm";
import { SaleDetail } from "../interfaces";
import { formFieldsSale, formSchemaSale } from "../utils";
import { reset } from "../utils/saleSlice";
import { columnsSaleDetailActions } from "./ColumnsTableSaleDetail";
import { CreateSaleDetail } from "./CreateSaleDetail";
import { DataTableSaleDetail } from "./DataTableSaleDetails";
import { ModifySaleDetail } from "./ModifySaleDetail";
import { useEffect } from "react";

export const CreateSale = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { mutate, isSuccess, isPending } = usePostSale();
  const {
    quantity,
    total,
    details,
    queryClients,
    queryCrops,
    formSale,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    saleDetail,
    setSaleDetail,
  } = useSaleForm();

  useEffect(() => {
    dispatch(reset());
  }, []);
  const navigate = useNavigate();

  const onSubmitSale = (values: z.infer<typeof formSchemaSale>) => {
    if (details.length === 0) {
      toast.error("Debes registrar al menos 1 venta");
      return;
    }

    mutate({
      ...values,
      total,
      quantity,
      details: details.map((item: SaleDetail) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          client: { id: rest.client.id },
          crop: { id: rest.crop.id },
        };
      }),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate("../view");
  }

  const isLoading = queryClients.isLoading || queryCrops.isLoading;
  const isError = queryClients.isError || queryCrops.isError;

  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <Label className="text-2xl">Registro de venta</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <Form {...formSale}>
          <form id="formSale" className="ml-1">
            <FormField
              control={formSale.control}
              name={"date"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsSale.date.label}
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>{formFieldsSale.date.placeholder}</span>
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
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {formFieldsSale.date.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSale.control}
              name="is_receivable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFieldsSale.is_receivable.label}</FormLabel>

                  <div className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md w-[280px]">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div className="space-y-1 leading-none ">
                      <FormDescription className="py-1">
                        La venta aun esta pendiente de cobro
                      </FormDescription>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </form>
          <Separator className="w-full my-5" />
          <Label className="text-sm">
            A continuación registre de forma individual la venta que le realizo
            a cada cliente:
          </Label>

          <Button
            onClick={() => setIsOpenDialogForm(true)}
            className="block my-2 ml-1"
          >
            Agregar registro
          </Button>

          <CreateSaleDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          <DataTableSaleDetail
            data={details}
            columns={columnsSaleDetailActions}
            setSaleDetail={setSaleDetail}
            setIsOpenDialogModifyForm={setIsOpenDialogModifyForm}
          />

          {isOpenDialogModifyForm && (
            <ModifySaleDetail
              defaultValues={saleDetail}
              isDialogOpen={isOpenDialogModifyForm}
              setDialogOpen={setIsOpenDialogModifyForm}
            />
          )}

          {/* TODO: Dar formato de moneda a los valores numéricos */}
          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
            <FormField
              key={"quantity"}
              control={formSale.control}
              name={"quantity"}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{"Total a vender:"}</FormLabel>

                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      className="w-40 text-center"
                      placeholder={"0"}
                      {...field}
                      type="number"
                      min={0}
                      step={50}
                      onChange={(e) => {
                        return !Number.isNaN(e.target.value)
                          ? field.onChange(parseFloat(e.target.value))
                          : 0;
                      }}
                      value={quantity}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSale.control}
              name={"total"}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{"Total a pagar:"}</FormLabel>

                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      {...field}
                      className="w-40 text-center"
                      placeholder={"0"}
                      type="number"
                      min={0}
                      onChange={(e) => {
                        return !Number.isNaN(e.target.value)
                          ? field.onChange(parseFloat(e.target.value))
                          : 0;
                      }}
                      value={total}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="w-full my-5" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button
              type="submit"
              form="formSale"
              disabled={isPending}
              onClick={formSale.handleSubmit(onSubmitSale)}
            >
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Guardar
            </Button>
            <ButtonCancelRegister action={() => navigate(-1)} />
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
