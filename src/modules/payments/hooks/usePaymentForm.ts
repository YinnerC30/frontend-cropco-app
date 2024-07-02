import { useCreateForm } from "@/modules/core/hooks/useCreateForm";
import { formSchemaPayments } from "../utils";
import { useGetAllEmployees } from "@/modules/employees/hooks/useGetAllEmployees";
import { RootState, useAppSelector } from "@/redux/store";

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
