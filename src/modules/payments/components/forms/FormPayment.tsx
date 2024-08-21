import { Badge, Button, Form, Label, Separator } from "@/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { MethodOfPayment } from "../../interfaces/MethodOfPayment";
import { formFieldsPayments } from "../../utils";
import { calculateTotal } from "../../utils/paymentSlice";
import { TablesPendingPayments } from "../TablesPendingPayments";

export const FormPayment = ({
  // defaultValues,
  isPending,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  const {
    formPayment,
    queryEmployees,
    paymentsToPay,
    totalToPay,
    openPopoverEmployee,
    setOpenPopoverEmployee,
  } = usePaymentForm();

  const getHarvestToPay = () => {
    const harvests =
      paymentsToPay
        .filter((item: any) => item.type === "harvest")
        .map(({ id }: any) => id) ?? [];
    return harvests;
  };

  const getWorksToPay = () => {
    const works =
      paymentsToPay
        .filter((item: any) => item.type === "work")
        .map(({ id }: any) => id) ?? [];
    return works;
  };

  useEffect(() => {
    if (paymentsToPay) {
      formPayment.reset({
        ...formPayment.getValues(),
        categories: { harvests: getHarvestToPay(), works: getWorksToPay() },
      });
    }
  }, [paymentsToPay]);

  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");

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

  const dispatch = useAppDispatch();
  dispatch(calculateTotal());

  // Table components

  return (
    <Form {...formPayment}>
      <form
        id="formPayment"
        onSubmit={formPayment.handleSubmit((data) =>
          onSubmit(data, getHarvestToPay(), getWorksToPay(), totalToPay)
        )}
      >
        <FormFieldCalendar
          control={formPayment.control}
          description={formFieldsPayments.date.description}
          label={formFieldsPayments.date.label}
          name={"date"}
          placeholder={formFieldsPayments.date.placeholder}
          readOnly={readOnly}
        />
        <FormFieldCommand
          openPopover={openPopoverEmployee}
          setOpenPopover={setOpenPopoverEmployee}
          data={queryEmployees?.data?.rows ?? []}
          form={formPayment}
          nameToShow={"first_name"}
          control={formPayment.control}
          description={formFieldsPayments.employee.description}
          label={formFieldsPayments.employee.label}
          name={"employee.id"}
          placeholder={formFieldsPayments.employee.placeholder}
          readOnly={readOnly}
        />

        {/* Tablas */}
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
        {/* TODO: Mejorar estilo de los badges */}

        {employeeId.length <= 0 ? (
          <Label>
            Debes seleccionar un empleado para que se muestren los pagos
            pendientes
          </Label>
        ) : (
          <TablesPendingPayments employeeId={employeeId} form={formPayment} />
        )}
        {/* Fin Tablas */}

        <Separator className="my-4" />
        <FormFieldSelect
          items={[
            MethodOfPayment.EFECTIVO,
            MethodOfPayment.INTERCAMBIO,
            MethodOfPayment.TRANSFERENCIA,
          ]}
          control={formPayment.control}
          description={formFieldsPayments.method_of_payment.description}
          label={formFieldsPayments.method_of_payment.label}
          name={"method_of_payment"}
          placeholder={formFieldsPayments.method_of_payment.placeholder}
          readOnly={readOnly}
        />

        <FormFieldInput
          className="hidden"
          control={formPayment.control}
          description={formFieldsPayments.total.description}
          label={formFieldsPayments.total.label}
          name={"total"}
          placeholder={formFieldsPayments.total.placeholder}
          readOnly={true}
          type="number"
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={"indigo"}
          >
            {FormatMoneyValue(totalToPay)}
          </Badge>
        </FormFieldInput>

        <Separator className="w-full my-5" />

        {!readOnly && (
          <ButtonsForm
            isPending={isPending ?? false}
            formId={"formPayment"}
            className={"flex w-48 gap-2 mt-2"}
          />
        )}

        {readOnly && (
          <div className="flex items-center gap-2">
            <Button className="my-2" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
