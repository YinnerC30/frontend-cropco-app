import { Label, Separator } from "@/components";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useGetEmployeePendingPayments } from "../hooks/useGetEmployeePendingPayments";
import { setDataEmployee } from "../utils/paymentSlice";

import { FormFieldDataTable } from "@/modules/core/components/form/FormFieldDataTable";
import { DataTableForm } from "@/modules/core/components/table/DataTableForm";
import { toast } from "sonner";
import { columnsPaymentsPendingHarvestActions } from "./columns/ColumnsTablePaymentsPendingHarvest";
import { columnsPaymentsPendingWorkActions } from "./columns/ColumnsTablePaymentsPendingWork";
import { columnsPaymentsToPayActions } from "./columns/ColumnsTablePaymentsToPay";
import { UseFormReturn } from "react-hook-form";

interface Props {
  employeeId: string;
  form: UseFormReturn<any, any, undefined>;
}

export const TablesPendingPayments = ({ employeeId, form }: Props) => {
  const { data, isLoading, isError } =
    useGetEmployeePendingPayments(employeeId);

  const { dataEmployee, paymentsToPay } = useAppSelector(
    (state: RootState) => state.payment
  );

  const getHarvestsToShow = () => {
    const { harvests_detail = [] } = data;
    return harvests_detail.filter(
      (item: any) => item.payment_is_pending === true
    );
  };
  const getWorksToShow = () => {
    const { works_detail = [] } = data;
    return works_detail.filter((item: any) => item.payment_is_pending === true);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!data) {
      const { harvests_detail, works_detail } = data;
      dispatch(
        setDataEmployee({
          harvests_detail: getHarvestsToShow(),
          works_detail: getWorksToShow(),
        })
      );
      if (harvests_detail.length < 1 && works_detail.length < 1) {
        toast.info("El empleado seleccionado NO tiene pagos pendientes");
      }
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorLoading />;

  return (
    <>
      <Label className="text-xl">Pagos pendientes de cosecha:</Label>

      <DataTableForm
        data={dataEmployee?.harvests_detail ?? []}
        columns={columnsPaymentsPendingHarvestActions}
        nameColumnToFilter={"value_pay"}
        placeholderInputToFilter={""}
      />
      <Separator className="my-4" />

      <Label className="text-xl">Pagos pendientes de trabajo:</Label>
      <DataTableForm
        data={dataEmployee?.works_detail ?? []}
        columns={columnsPaymentsPendingWorkActions}
        nameColumnToFilter={""}
        placeholderInputToFilter={""}
      />

      <Separator className="my-4" />

      <FormFieldDataTable
        control={form.control}
        description={"Aquí se muestran los pagos que finalmente se liquidaran "}
        label={"Resumen a pagar:"}
        name={"categories"}
        placeholder={"placeholder"}
        readOnly={false}
      >
        <DataTableForm
          data={paymentsToPay ?? []}
          columns={columnsPaymentsToPayActions}
          nameColumnToFilter={""}
          placeholderInputToFilter={""}
        />
      </FormFieldDataTable>
    </>
  );
};
