import { useCreateForm } from '@/modules/core/hooks';
import { useGetEmployeePendingPayments } from '@/modules/payments/hooks/queries/useGetEmployeePendingPayments';
import {
  PaymentsHarvest,
  PaymentsWork,
} from '@/modules/payments/interfaces/ResponseGetOnePayment';
import { formSchemaPayments } from '@/modules/payments/utils';
import {
  resetDataEmployee,
  setRecordsToPay,
} from '@/modules/payments/utils/paymentSlice';
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
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const { payment } = useAppSelector((state: RootState) => state);

  const employeeId: string = formPayments.watch('employee.id') ?? '';

  const queryPaymentsEmployee = useGetEmployeePendingPayments(employeeId, true);

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

  useEffect(() => {
    formPayments.setValue('total', total, { shouldValidate: true });
  }, [total]);

  useEffect(() => {
    if (!!defaultValues) {
      const harvests = defaultValues?.payments_harvest.map(
        ({
          harvests_detail: {
            id,
            total,
            value_pay,
            payment_is_pending,
            harvest: { date },
          },
        }: PaymentsHarvest) => ({
          id,
          total,
          value_pay,
          payment_is_pending,
          date,
          type: 'harvest',
        })
      );

      const works = defaultValues?.payments_work.map(
        ({
          works_detail: {
            id,
            payment_is_pending,
            value_pay,
            work: { date },
          },
        }: PaymentsWork) => {
          return {
            date,
            id,
            value_pay,
            payment_is_pending,
            type: 'work',
          };
        }
      );

      dispatch(setRecordsToPay([...harvests, ...works]));
    }
  }, [defaultValues]);

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
        defaultValues,
      }}
    >
      {children}
    </FormPaymentContext.Provider>
  );
};
