import { Badge, Button, Form, Label, Separator } from "@/components";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldCalendar } from "@/modules/core/components/form/FormFieldCalendar";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldDataTable } from "@/modules/core/components/form/FormFieldDataTable";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePaymentForm } from "../../hooks/usePaymentForm";
import { MethodOfPayment } from "../../interfaces/MethodOfPayment";
import { formFieldsPayments } from "../../utils";
import {
  addRecordsToPay,
  calculateTotal,
  resetAll,
} from "../../utils/paymentSlice";
import { columnsPaymentsToPay } from "../columns/ColumnsTablePaymentsToPay";
import { TablesPendingPayments } from "../TablesPendingPayments";

export const FormPayment = ({
  defaultValues,
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

  const [employeeId, setEmployeeId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(resetDataEmployee());
    // dispatch(resetPaymentsToPay());
    if (defaultValues) {
      const {
        payments_harvest = [],
        payments_work = [],
        ...rest
      } = defaultValues;
      const data = {
        ...rest,
        // categories: {
        //   harvests: payments_harvest,
        //   works: payments_work,
        // },
      };
      // console.log(data);
      formPayment.reset(data);

      dispatch(
        addRecordsToPay(
          defaultValues.payments_harvest.map((item: any) => {
            return {
              id: item?.harvests_detail?.id,
              value_pay: item?.harvests_detail?.value_pay,
              payment_is_pending: item?.harvests_detail?.payment_is_pending,
              type: "harvest",
              date: item?.harvests_detail?.harvest?.date,
            };
          })
        )
      );
      dispatch(
        addRecordsToPay(
          defaultValues.payments_work.map((item: any) => {
            return {
              id: item?.works_detail?.id,
              value_pay: item?.works_detail?.value_pay,
              payment_is_pending: item?.works_detail?.payment_is_pending,
              type: "work",
              date: item?.works_detail?.work?.date,
            };
          })
        )
      );
      dispatch(calculateTotal());
    }
  }, []);

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

  const getEmployeesToShow = () => {
    const employees = queryEmployees?.data?.rows ?? [];
    if (defaultValues) {
      return [...employees, defaultValues.employee];
    }
    return [...employees];
  };

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
          data={getEmployeesToShow() ?? []}
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

        {defaultValues && (
          <FormFieldDataTable
            control={formPayment.control}
            description={
              "Aquí se muestran los pagos que finalmente se liquidaran "
            }
            label={"Resumen a pagar:"}
            name={"categories"}
            placeholder={"placeholder"}
            readOnly={false}
          >
            <DataTableForm
              data={paymentsToPay ?? []}
              columns={columnsPaymentsToPay}
              nameColumnToFilter={""}
              placeholderInputToFilter={""}
            />
          </FormFieldDataTable>
        )}

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
            <Button
              className="my-2"
              onClick={() => {
                dispatch(resetAll());
                navigate(-1);
              }}
            >
              Volver
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
