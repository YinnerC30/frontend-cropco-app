import { useCreateForm } from '@/modules/core/hooks';
import { useGetEmployeePendingPayments } from '@/modules/payments/hooks/queries/useGetEmployeePendingPayments';
import { formSchemaPayments } from '@/modules/payments/utils';
import { resetDataEmployee } from '@/modules/payments/utils/paymentSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import React, { createContext, useEffect, useMemo } from 'react';

export const FormPaymentContext = createContext<any>(null);

export const defaultValuesany: any = {};

export const FormPaymentProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formPayments = useCreateForm({
    schema: formSchemaPayments,
    defaultValues: {
      date: undefined,
      method_of_payment: undefined,
      employee: undefined,
      total: 0,
    },
    validationMode: 'onSubmit',
  });

  const dispatch = useAppDispatch();

  const { payment } = useAppSelector((state: RootState) => state);

  const employeeId: string = formPayments.watch('employee.id') ?? '';

  const queryPaymentsEmployee = useGetEmployeePendingPayments(employeeId);

  const recordsToPay = useMemo(
    () => payment.paymentsToPay,
    [payment, employeeId]
  );
  const pendingHarvests = useMemo(
    () => payment.dataEmployee.harvests_detail,
    [payment.dataEmployee.harvests_detail, employeeId]
  );
  const pendingWorks = useMemo(
    () => payment.dataEmployee.works_detail,
    [payment.dataEmployee.works_detail, employeeId]
  );

  const total = recordsToPay.reduce(
    (total: number, detail: any) => Number(total) + Number(detail.value_pay),
    0
  );

  const getHarvestToPay = () => {
    const harvests =
      recordsToPay
        .filter((item: any) => item.type === 'harvest')
        .map(({ id }: any) => id) ?? [];
    return harvests;
  };

  const getWorksToPay = () => {
    const works =
      recordsToPay
        .filter((item: any) => item.type === 'work')
        .map(({ id }: any) => id) ?? [];
    return works;
  };

  useEffect(() => {
    if (!(employeeId.length > 0)) {
      dispatch(resetDataEmployee());
    }
  }, [employeeId]);

  return (
    <FormPaymentContext.Provider
      value={{
        form: formPayments,
        employeeId,
        queryPaymentsEmployee,
        recordsToPay,
        pendingHarvests,
        pendingWorks,
        total,
        onSubmit,
        isSubmitting,
        readOnly,
        getHarvestToPay,
        getWorksToPay,
      }}
    >
      {children}
    </FormPaymentContext.Provider>
  );
};
