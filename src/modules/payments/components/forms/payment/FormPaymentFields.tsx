import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldCommand,
  FormFieldDataTable,
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
import { FormPaymentWorksPendingDataTable } from './FormPaymentWorksPendingDataTable';

export const FormPaymentFields: React.FC = () => {
  const {
    formPayment,
    onSubmit,
    total,
    getHarvestsToPay,
    getWorksToPay,
    readOnly,
    defaultValues,
  } = useFormPaymentContext();

  const queryEmployees = useGetAllEmployeesWithPendingPayments();
  const employees = queryEmployees?.data?.rows ?? [];

  return (
    <>
      <Form {...formPayment}>
        <form
          onSubmit={formPayment.handleSubmit(() => {
            const data = formPayment.watch();
            delete data.payments_harvest;
            delete data.payments_work;
            delete data.id;
            delete data.records_to_pay;
            onSubmit({
              ...data,
              total,
              categories: {
                harvests: getHarvestsToPay(),
                works: getWorksToPay(),
              },
            });
          })}
          id="formPayment"
        >
          <FormFieldCalendar
            control={formPayment.control}
            description={formFieldsPayments.date.description}
            label={formFieldsPayments.date.label}
            name={'date'}
            placeholder={formFieldsPayments.date.placeholder}
            disabled={readOnly}
          />

          <FormFieldCommand
            data={readOnly ? [...employees, defaultValues.employee] : employees}
            form={formPayment}
            nameToShow={'first_name'}
            control={formPayment.control}
            description={formFieldsPayments.employee.description}
            label={formFieldsPayments.employee.label}
            name={'employee'}
            placeholder={formFieldsPayments.employee.placeholder}
            disabled={readOnly}
            isLoading={queryEmployees.isLoading}
            className="w-52"
          />

          {/* Table */}

          <div>
            {!readOnly && (
              <>
                <FormPaymentHarvestsPendingDataTable />
                <FormPaymentWorksPendingDataTable />
              </>
            )}

            <FormFieldDataTable
              control={formPayment.control}
              description={''}
              label={'Pagos a facturar'}
              name={'records_to_pay'}
              placeholder={''}
              disabled={readOnly}
            >
              <FormPaymentToPayDataTable />
            </FormFieldDataTable>
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
            control={formPayment.control}
            description={formFieldsPayments.method_of_payment.description}
            label={formFieldsPayments.method_of_payment.label}
            name={'method_of_payment'}
            placeholder={formFieldsPayments.method_of_payment.placeholder}
            disabled={readOnly}
          />

          <FormFieldInput
            control={formPayment.control}
            description={formFieldsPayments.total.description}
            label={formFieldsPayments.total.label}
            name={'total'}
            placeholder={formFieldsPayments.total.placeholder}
            disabled={readOnly}
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
    </>
  );
};
