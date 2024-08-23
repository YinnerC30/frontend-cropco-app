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
import { ErrorLoading, Loading } from "@/modules/core/components";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConsumptionForm } from "../hooks/useConsumptionForm";
import { useGetConsumption } from "../hooks/useGetConsumption";
import { add, reset } from "../utils/consumptionSlice";
import { formFields } from "../utils/formFields";

import { CreateConsumptionDetail } from "./CreateConsumptionDetail";
import { DataTableConsumptionDetail } from "./DataTableConsumptionDetails";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { columnsConsumptionDetail } from "./ColumnsConsumptionDetail";

export const ViewConsumption = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetConsumption(id!);

  const navigate = useNavigate();
  const {
    formConsumption,
    details,
    isOpenDialogForm,
    setIsOpenDialogForm,
    dispatch,
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
      <Label className="text-2xl">Ver registro de consumo</Label>
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

          <CreateConsumptionDetail
            isOpenDialogForm={isOpenDialogForm}
            setIsOpenDialogForm={setIsOpenDialogForm}
          />

          <DataTableConsumptionDetail
            data={details}
            setSaleDetail={() => {
              return;
            }}
            setIsOpenDialogModifyForm={() => {
              return;
            }}
            columns={columnsConsumptionDetail}
          />

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
