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
import { ErrorLoading, Loading } from "@/modules/core/components";
import { AppDispatch } from "@/redux/store";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSale } from "../hooks";
import { useSaleForm } from "../hooks/useSaleForm";
import { formFieldsSale } from "../utils";
import { add, calculateTotal, reset } from "../utils/saleSlice";
import { columnsSaleDetail } from "./ColumnsTableSaleDetail";
import { CreateSaleDetail } from "./CreateSaleDetail";
import { DataTableSaleDetail } from "./DataTableSaleDetails";
import { ModifySaleDetail } from "./ModifySaleDetail";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ViewSale = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, isError } = useGetSale(id!);
  const {
    quantity,
    total,
    details,
    formSale,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    saleDetail,
  } = useSaleForm();
  const navigate = useNavigate();

  // Reset state on component mount
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Populate form and store details when data is available
  useEffect(() => {
    if (data && details.length === 0) {
      formSale.reset({
        ...data,
        date: new Date(`${data.date}T00:00:00-05:00`),
      });
      dispatch(add(data.details));
      dispatch(calculateTotal());
    }
  }, [data, details.length, formSale, dispatch]);

  // Navigate on successful mutation

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/sales/all", name: "Ventas" }]}
        finalItem={`${format(data.date + "T00:00:00-05:00", "PPP", {
          locale: es,
        })}`}
      />
      <Label className="text-2xl">Información de la venta</Label>
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
                          disabled
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
                        disabled
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

          <CreateSaleDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          <DataTableSaleDetail data={details} columns={columnsSaleDetail} />

          {isOpenDialogModifyForm && (
            <ModifySaleDetail
              defaultValues={saleDetail}
              isDialogOpen={isOpenDialogModifyForm}
              setDialogOpen={setIsOpenDialogModifyForm}
            />
          )}

          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
            <FormField
              control={formSale.control}
              name={"total"}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{"Total cosechado:"}</FormLabel>

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
            <FormField
              key={"quantity"}
              control={formSale.control}
              name={"quantity"}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{"Total valor a pagar:"}</FormLabel>

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
          </div>

          <Separator className="w-full my-5" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
