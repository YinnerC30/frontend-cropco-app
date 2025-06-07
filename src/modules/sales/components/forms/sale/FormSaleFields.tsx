import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable,
  FormFieldInput,
} from '@/modules/core/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';

import { useFormSaleContext } from '@/modules/sales/hooks/context/useFormSaleContext';
import { formFieldsSale } from '@/modules/sales/utils';
import { FormSaleDataTable } from './FormSaleDataTable';
import React from 'react';

export const FormSaleFields: React.FC = () => {
  const { formSale, onSubmit, readOnly, value_pay, amount } =
    useFormSaleContext();

  return (
    <Form {...formSale}>
      <form onSubmit={formSale.handleSubmit(onSubmit)} id="formSale">
        <FormFieldCalendar
          control={formSale.control}
          description={formFieldsSale.date.description}
          label={formFieldsSale.date.label}
          name={'date'}
          placeholder={formFieldsSale.date.placeholder}
          disabled={readOnly}
          className='w-[240px]'
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={formSale.control}
            description={''}
            label={formFieldsSale.details.label}
            name={'details'}
            placeholder={''}
            disabled={readOnly}
          >
            <FormSaleDataTable />
          </FormFieldDataTable>
        </div>

        <FormFieldInput
          control={formSale.control}
          description={formFieldsSale.value_pay.description}
          label={formFieldsSale.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsSale.value_pay.placeholder}
          disabled={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatMoneyValue(value_pay)}
          </Badge>
        </FormFieldInput>
        <FormFieldInput
          control={formSale.control}
          description={formFieldsSale.amount.description}
          label={formFieldsSale.amount.label}
          name={'amount'}
          placeholder={formFieldsSale.amount.placeholder}
          disabled={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(amount) + ' Kg'}
          </Badge>
        </FormFieldInput>
      </form>
    </Form>
  );
};
