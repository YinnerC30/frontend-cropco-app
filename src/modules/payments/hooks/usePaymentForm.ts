import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { RootState, useAppSelector } from "@/redux/store";
import { formSchemaPayments } from "../utils";
import { useGetAllEmployeesWithPendingPayments } from "./useGetAllEmployeesWithPendingPayments";
import { useState } from "react";

export const defaultValues = {
  date: undefined,
  method_of_payment: undefined,
  employee: undefined,
  total: 0,
};

export const usePaymentForm = () => {
  const formPayment = useCreateForm({
    schema: formSchemaPayments,
    defaultValues,
  });

  const { query: queryEmployees } = useGetAllEmployeesWithPendingPayments();

  const [openPopoverEmployee, setOpenPopoverEmployee] = useState(false);

  const { employeeId, dataEmployee, paymentsToPay, totalToPay } =
    useAppSelector((state: RootState) => state.payment);

  return {
    formPayment,
    queryEmployees,
    employeeId,
    dataEmployee,
    paymentsToPay,
    totalToPay,
    openPopoverEmployee,
    setOpenPopoverEmployee,
  };
};
