import {
  Button,
  Calendar,
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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPurchase } from "../hooks/useGetPurchase";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { formFields } from "../utils/formFields";
import { add, calculateTotal, reset } from "../utils/purchaseSlice";
import { columnsPurchaseDetail } from "./ColumnsTablePurchaseDetail";
import { CreatePurchaseDetail } from "./CreatePurchaseDetail";
import { DataTablePurchaseDetail } from "./DataTablePurchaseDetails";

export const ViewShopping = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPurchase(id!);

  const navigate = useNavigate();
  const {
    formPurchase,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    total,
    dispatch,
    setPurchaseDetail,
  } = usePurchaseForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (data && details.length === 0) {
      formPurchase.reset({
        ...data,
        date: new Date(`${data.date}T00:00:00-05:00`),
      });
      dispatch(add(data.details));
      dispatch(calculateTotal());
    }
  }, [data, details.length, formPurchase, dispatch]);

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <Label className="text-2xl">Modificar Compra</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <Form {...formPurchase}>
          <form id="formPurchase" className="ml-1">
            <FormField
              control={formPurchase.control}
              name={"date"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFields.date.label}
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
                            <span>{formFields.date.placeholder}</span>
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
                    {formFields.date.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <Separator className="w-full my-5" />
          <Label className="text-sm">
            A continuación registre de forma individual la compra que le realizo
            a cada proveedor:
          </Label>

          <CreatePurchaseDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          <DataTablePurchaseDetail
            data={details}
            setSaleDetail={setPurchaseDetail}
            setIsOpenDialogModifyForm={() => {
              return;
            }}
            columns={columnsPurchaseDetail}
          />

          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[80px] justify-center">
            <FormField
              control={formPurchase.control}
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

          <Separator className="w-full my-1" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
