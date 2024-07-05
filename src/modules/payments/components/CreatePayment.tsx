import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Calendar,
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
  Select,
} from "@/components";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ButtonCancelRegister,
  ErrorLoading,
  Loading,
} from "@/modules/core/components";
import { Employee } from "@/modules/employees/interfaces/Employee";
import { useAppDispatch } from "@/redux/store";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { usePaymentForm } from "../hooks/usePaymentForm";
import { usePostPayment } from "../hooks/usePostPayment";
import { MethodOfPayment } from "../interfaces/MethodOfPayment";
import { formFieldsPayment, formSchemaPayments } from "../utils";
import {
  calculateTotal,
  modifyEmployeeId,
  resetDataEmployee,
  resetPaymentsToPay,
} from "../utils/paymentSlice";
import { TablesPendingPayments } from "./TablesPendingPayments";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";

export const CreatePayment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { formPayment, queryEmployees, paymentsToPay, totalToPay } =
    usePaymentForm();

  const { isSuccess, isPending, mutate } = usePostPayment();
  const [employeeId, setEmployeeId] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchemaPayments>) => {
    if (paymentsToPay.length === 0) {
      return toast.warning("No se han agregado registros a pagar");
    }
    mutate({
      ...values,
      total: totalToPay,
      categories: {
        harvests: paymentsToPay
          .filter((item: any) => item.type === "harvest")
          .map(({ id }: any) => id),
        works: paymentsToPay
          .filter((item: any) => item.type === "work")
          .map(({ id }: any) => id),
      },
    });
  };

  const searchPendingPayment = () => {
    const idEmployee = formPayment.getValues("employee.id");
    if (!idEmployee) {
      toast.error(
        "Debes seleccionar un empleado para cargar los pagos pendientes"
      );
    } else {
      setEmployeeId(idEmployee);
    }
  };

  if (isSuccess) {
    navigate("../view");
  }

  if (queryEmployees.isLoading) return <Loading />;
  if (queryEmployees.isError) return <ErrorLoading />;

  dispatch(calculateTotal());

  return (
    <>
      <Label className="text-2xl">Registro de pago</Label>

      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...formPayment}>
          <form id="formPayment" onSubmit={formPayment.handleSubmit(onSubmit)}>
            <FormField
              control={formPayment.control}
              name={"date"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsPayment.date.label}
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
                            <span>{formFieldsPayment.date.placeholder}</span>
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
                    {formFieldsPayment.date.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formPayment.control}
              name={"employee.id"}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsPayment.employee.label}
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
                            ? queryEmployees.data.rows.find(
                                (item: Employee) => item.id === field.value
                              )?.first_name
                            : formFieldsPayment.employee.placeholder}

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar empleado..."
                          className="h-9"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56">
                            <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                            <CommandGroup>
                              {queryEmployees?.data?.rows &&
                                Array.isArray(queryEmployees.data.rows) &&
                                queryEmployees.data.rows.map(
                                  (employee: Employee) => {
                                    return (
                                      <CommandItem
                                        value={employee.first_name}
                                        key={employee.id!}
                                        onSelect={() => {
                                          formPayment.setValue(
                                            "employee",
                                            {
                                              id: employee.id,
                                              first_name: employee.first_name,
                                            }!
                                          );
                                          formPayment.trigger("employee.id");
                                          dispatch(resetDataEmployee());
                                          dispatch(resetPaymentsToPay());
                                          dispatch(
                                            modifyEmployeeId({
                                              employeeId: employee.id,
                                            })
                                          );
                                          setEmployeeId(employee.id!);
                                        }}
                                      >
                                        {employee.first_name}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            employee.id! === field.value
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
                    {formFieldsPayment.employee.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={(event) => {
                event.preventDefault();
                searchPendingPayment();
                dispatch(calculateTotal());
              }}
            >
              Buscar pagos pendientes
            </Button>

            <Separator className="my-4" />

            {employeeId.length <= 0 ? (
              <Label>
                Debes seleccionar un empleado para que se muestren los pagos
                pendientes
              </Label>
            ) : (
              <TablesPendingPayments employeeId={employeeId} />
            )}

            <Separator className="my-4" />

            <FormField
              control={formPayment.control}
              name={"method_of_payment"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formFieldsPayment.method_of_payment.label}
                  </FormLabel>
                  <div className="w-40 ml-[1px]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            formFieldsPayment.method_of_payment.placeholder
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={MethodOfPayment.EFECTIVO}>
                          EFECTIVO
                        </SelectItem>
                        <SelectItem value={MethodOfPayment.TRANSFERENCIA}>
                          TRANSFERENCIA
                        </SelectItem>
                        <SelectItem value={MethodOfPayment.INTERCAMBIO}>
                          INTERCAMBIO
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <FormDescription>
                    {formFieldsPayment.method_of_payment.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
              <FormField
                control={formPayment.control}
                name={"total"}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>{"Total a pagar:"}</FormLabel>

                    <Input
                      className="w-24"
                      readOnly
                      value={FormatMoneyValue(totalToPay)}
                    />
                    <FormControl>
                      <Input
                        disabled
                        readOnly
                        {...field}
                        className="hidden w-40 text-center"
                        placeholder={"0"}
                        type="number"
                        min={0}
                        onChange={(e) => {
                          return !Number.isNaN(e.target.value)
                            ? field.onChange(parseFloat(e.target.value))
                            : 0;
                        }}
                        value={totalToPay}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formPayment" disabled={isPending}>
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
