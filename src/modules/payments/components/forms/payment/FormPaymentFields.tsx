import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
} from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers';

import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';
import { useGetAllEmployeesWithPendingPayments } from '@/modules/payments/hooks/queries/useGetAllEmployeesWithPendingPayments';
import { MethodOfPayment } from '@/modules/payments/interfaces/MethodOfPayment';
import { formFieldsPayments } from '@/modules/payments/utils';
import { FormPaymentHarvestsPendingDataTable } from './FormPaymentHarvestsPendingDataTable';
import { FormPaymentToPayDataTable } from './FormPaymentToPayDataTable';
import { FormPaymentWorksPendingDataTable } from './FormPaymentWorksPendingDataTable copy';

export const FormPaymentFields = () => {
  const { form, onSubmit, total, getHarvestToPay, getWorksToPay } =
    useFormPaymentContext();
  const queryEmployees = useGetAllEmployeesWithPendingPayments();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async () => {
            const data = form.watch();
            await onSubmit({
              ...data,
              total,
              categories: {
                harvests: getHarvestToPay(),
                works: getWorksToPay(),
              },
            });
          })}
          id="formPayment"
        >
          <FormFieldCalendar
            control={form.control}
            description={formFieldsPayments.date.description}
            label={formFieldsPayments.date.label}
            name={'date'}
            placeholder={formFieldsPayments.date.placeholder}
            readOnly={false}
          />

          <FormFieldCommand
            data={queryEmployees?.data?.rows ?? []}
            form={form}
            nameToShow={'first_name'}
            control={form.control}
            description={formFieldsPayments.employee.description}
            label={formFieldsPayments.employee.label}
            name={'employee.id'}
            placeholder={formFieldsPayments.employee.placeholder}
            readOnly={false}
            isLoading={queryEmployees.isLoading}
            className="w-52"
          />

          {/* Table */}

          <div className="w-[800px]">
            <FormPaymentHarvestsPendingDataTable />
            <FormPaymentWorksPendingDataTable />
            <FormPaymentToPayDataTable />
          </div>

          <FormFieldSelect
            items={[
              {
                key: MethodOfPayment.EFECTIVO,
                value: MethodOfPayment.EFECTIVO,
                label: 'Efectivo',
              },
              {
                key: MethodOfPayment.INTERCAMBIO,
                value: MethodOfPayment.INTERCAMBIO,
                label: 'Intercambio',
              },
              {
                key: MethodOfPayment.TRANSFERENCIA,
                value: MethodOfPayment.TRANSFERENCIA,
                label: 'Transferencia',
              },
            ]}
            control={form.control}
            description={formFieldsPayments.method_of_payment.description}
            label={formFieldsPayments.method_of_payment.label}
            name={'method_of_payment'}
            placeholder={formFieldsPayments.method_of_payment.placeholder}
            readOnly={false}
          />

          <FormFieldInput
            control={form.control}
            description={formFieldsPayments.total.description}
            label={formFieldsPayments.total.label}
            name={'total'}
            placeholder={formFieldsPayments.total.placeholder}
            readOnly={true}
            type="number"
            hiddenInput
          >
            <Badge
              className="block h-8 text-base text-center w-28"
              variant={'cyan'}
            >
              {FormatMoneyValue(total)}
            </Badge>
          </FormFieldInput>
        </form>
      </Form>
      {/* <pre>{JSON.stringify(queryPaymentsEmployee.data)}</pre> */}
    </>
  );
};
