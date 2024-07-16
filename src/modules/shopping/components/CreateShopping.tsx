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
import { ButtonCancelRegister } from "@/modules/core/components";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { PurchaseDetails } from "../interfaces/PurchaseDetails";
import { formFields } from "../utils/formFields";
import { formSchemaPurchase } from "../utils/formSchemaPurchase";
import { reset } from "../utils/purchaseSlice";
import { columnsPurchaseDetailActions } from "./ColumnsTablePurchaseDetail";
import { CreatePurchaseDetail } from "./CreatePurchaseDetail";
import { DataTablePurchaseDetail } from "./DataTablePurchaseDetails";
import { ModifyPurchaseDetail } from "./ModifyPurchaseDetail";

export const CreateShopping = () => {
  const {
    formPurchase,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,
    total,
    dispatch,
    purchaseDetail,
    setPurchaseDetail,
    mutate,
    isSuccess,
    isPending,
  } = usePurchaseForm();

  const onSubmitPurchase = (values: z.infer<typeof formSchemaPurchase>) => {
    if (details.length === 0) {
      toast.error("Debes registrar al menos 1 compra");
      return;
    }

    mutate({
      ...values,
      total,

      details: details.map((item: PurchaseDetails) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          supplier: { id: rest.supplier.id },
          supply: { id: rest.supply.id },
        };
      }),
    });
  };

  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(reset());
    navigate("../view");
  }

  return (
    <>
      <Label className="text-2xl">Registro de Compra</Label>
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

          <Button
            onClick={() => setIsOpenDialogForm(true)}
            className="block my-2 ml-1"
          >
            Agregar registro
          </Button>

          <CreatePurchaseDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          {isOpenDialogModifyForm && (
            <ModifyPurchaseDetail
              defaultValues={purchaseDetail}
              isDialogOpen={isOpenDialogModifyForm}
              setDialogOpen={setIsOpenDialogModifyForm}
            />
          )}

          <DataTablePurchaseDetail
            data={details}
            setSaleDetail={setPurchaseDetail}
            setIsOpenDialogModifyForm={setIsOpenDialogModifyForm}
            columns={columnsPurchaseDetailActions}
          />

          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
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

          <Separator className="w-full my-5" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button
              type="submit"
              form="formSale"
              disabled={isPending}
              onClick={formPurchase.handleSubmit(onSubmitPurchase)}
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
