import { Label, Separator } from "@/components";
import { ErrorLoading, Loading } from "@/modules/core/components";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useGetEmployeePendingPayments } from "../hooks/useGetEmployeePendingPayments";
import { setDataEmployee } from "../utils/paymentSlice";
import { columnsPaymentsPendingHarvestActions } from "./ColumnsTablePaymentsPendingHarvest";
import { columnsPaymentsPendingWorkActions } from "./ColumnsTablePaymentsPendingWork";
import { columnsPaymentsToPayActions } from "./ColumnsTablePaymentsToPay";
import { DataTablePaymentPending } from "./DataTablePaymentPending";
import { toast } from "sonner";

export const TablesPendingPayments = ({
  employeeId,
}: {
  employeeId: string;
}) => {
  const { data, isLoading, isError } =
    useGetEmployeePendingPayments(employeeId);

  const dispatch = useAppDispatch();
  const { dataEmployee, paymentsToPay } = useAppSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    if (!!data) {
      console.log(data);
      const { harvests_detail, works_detail } = data;
      dispatch(
        setDataEmployee({
          harvests_detail: harvests_detail.filter(
            (item: any) => item.payment_is_pending === true
          ),
          works_detail: works_detail.filter(
            (item: any) => item.payment_is_pending === true
          ),
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
      {dataEmployee?.works_detail.length < 1 &&
        dataEmployee?.harvests_detail.length < 1 &&
        paymentsToPay.length < 1 && (
          <Label>El empleado NO tiene pagos pendientes</Label>
        )}

      {dataEmployee?.harvests_detail.length > 0 && (
        <>
          <Label className="text-xl">Pagos pendientes de cosecha:</Label>
          <DataTablePaymentPending
            data={dataEmployee?.harvests_detail ?? []}
            columns={columnsPaymentsPendingHarvestActions}
          />
          <Separator className="my-4" />
        </>
      )}

      {dataEmployee?.works_detail.length > 0 && (
        <>
          <Label className="text-xl">Pagos pendientes de trabajo:</Label>
          <DataTablePaymentPending
            data={dataEmployee?.works_detail ?? []}
            columns={columnsPaymentsPendingWorkActions}
          />
          <Separator className="my-4" />
        </>
      )}

      {dataEmployee?.works_detail.length > 0 ||
      dataEmployee?.harvests_detail.length > 0 ||
      paymentsToPay.length > 0 ? (
        <>
          <Label className="text-xl">Resumen a pagar:</Label>
          <DataTablePaymentPending
            data={paymentsToPay ?? []}
            columns={columnsPaymentsToPayActions}
          />
        </>
      ) : null}
    </>
  );
};
