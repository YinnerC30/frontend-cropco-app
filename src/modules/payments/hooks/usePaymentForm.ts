import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { useGetEmployee } from "@/modules/employees/hooks/useGetEmployee";
import { RootState, useAppSelector } from "@/redux/store";
import { formSchemaPayments } from "../utils";

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

  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: "",
    allRecords: true,
  });

  const { employeeId, dataEmployee, paymentsToPay, totalToPay } =
    useAppSelector((state: RootState) => state.payment);

  return {
    formPayment,
    queryEmployees,
    employeeId,
    dataEmployee,
    paymentsToPay,
    totalToPay,
  };
};
