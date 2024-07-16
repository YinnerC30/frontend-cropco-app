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
import { ButtonCancelRegister } from "@/modules/core/components";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useConsumptionForm } from "../hooks/useConsumptionForm";

import { reset } from "../utils/consumptionSlice";
import { formFields } from "../utils/formFields";
import { formSchemaConsumption } from "../utils/formSchemaConsumption";
import { columnsPurchaseDetailActions } from "./ColumnsTablePurchaseDetail";
import { CreateConsumptionDetail } from "./CreateConsumptionDetail";
import { DataTableConsumptionDetail } from "./DataTableConsumptionDetails";
import { ModifyConsumptionDetail } from "./ModifyConsumptionDetail";
import { ConsumptionDetails } from "../interfaces/ConsumptionDetails";
import { useEffect } from "react";

export const CreateConsumption = () => {
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
    mutate,
    isSuccess,
    isPending,
  } = useConsumptionForm();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const onSubmitPurchase = (values: z.infer<typeof formSchemaConsumption>) => {
    if (details.length === 0) {
      toast.error("Debes registrar al menos 1 compra");
      return;
    }

    mutate({
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

  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(reset());
    navigate("../view");
  }

  return (
    <>
      <Label className="text-2xl">Registro de Consumo</Label>
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
            A continuación registre de forma individual el consumo que le
            realizo a cada cultivo:
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
              form="formConsumption"
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
