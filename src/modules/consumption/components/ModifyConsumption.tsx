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
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useConsumptionForm } from "../hooks/useConsumptionForm";
import { useGetConsumption } from "../hooks/useGetConsumption";
import { usePatchConsumption } from "../hooks/usePatchConsumption";
import { ConsumptionDetails } from "../interfaces/ConsumptionDetails";
import { add, reset } from "../utils/consumptionSlice";
import { formFields } from "../utils/formFields";

import { columnsPurchaseDetailActions } from "./ColumnsTablePurchaseDetail";
import { CreateConsumptionDetail } from "./CreateConsumptionDetail";
import { DataTableConsumptionDetail } from "./DataTableConsumptionDetails";
import { ModifyConsumptionDetail } from "./ModifyConsumptionDetail";
import { formSchemaConsumption } from "../utils/formSchemaConsumption";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ModifyConsumption = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetConsumption(id!);
  const { mutate, isSuccess, isPending } = usePatchConsumption(id!);
  const navigate = useNavigate();
  const {
    formConsumption,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    isOpenDialogModifyForm,
    setIsOpenDialogModifyForm,

    dispatch,
    consumptionDetail,
    setConsumptionDetail,
  } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (data && details.length === 0) {
      formConsumption.reset({
        ...data,
        date: new Date(`${data.date}T00:00:00-05:00`),
      });
      dispatch(add(data.details));
    }
  }, [data, details.length, formConsumption, dispatch]);

  const onSubmitPurchase = (values: z.infer<typeof formSchemaConsumption>) => {
    if (details.length === 0) {
      toast.error("Debes registrar al menos 1 compra");
      return;
    }

    mutate({
      id,
      ...values,

      details: details.map((item: ConsumptionDetails) => {
        const { id, ...rest } = item;
        return {
          ...rest,
          crop: { id: rest.crop.id },
          supply: { id: rest.supply.id },
        };
      }),
    });
  };

  if (isSuccess) {
    dispatch(reset());
    navigate("../all");
  }

  // Render loading or error states
  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <BreadCrumb
        items={[{ link: "/consumption/all", name: "Consumos" }]}
        finalItem={`${format(data.date + "T00:00:00-05:00", "PPP", {
          locale: es,
        })}`}
      />
      <Label className="text-2xl">Modificar registro de consumo</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <Form {...formConsumption}>
          <form id="formConsumption" className="ml-1">
            <FormField
              control={formConsumption.control}
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

          <CreateConsumptionDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          {isOpenDialogModifyForm && (
            <ModifyConsumptionDetail
              defaultValues={consumptionDetail}
              isDialogOpen={isOpenDialogModifyForm}
              setDialogOpen={setIsOpenDialogModifyForm}
            />
          )}

          <DataTableConsumptionDetail
            data={details}
            setSaleDetail={setConsumptionDetail}
            setIsOpenDialogModifyForm={setIsOpenDialogModifyForm}
            columns={columnsPurchaseDetailActions}
          />

          <Separator className="w-full my-5" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button
              type="submit"
              form="formSale"
              disabled={isPending}
              onClick={formConsumption.handleSubmit(onSubmitPurchase)}
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
