import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable,
  FormFieldInput,
} from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useFormSaleContext } from '@/modules/sales/hooks/context/useFormSaleContext';
import { formFieldsSale } from '@/modules/sales/utils';
import { FormSaleDataTable } from './FormSaleDataTable';

export const FormSaleFields = () => {
  const { formSale, onSubmit, readOnly, total, quantity } =
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
          readOnly={readOnly}
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={formSale.control}
            description={''}
            label={formFieldsSale.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormSaleDataTable />
          </FormFieldDataTable>
        </div>
        <FormFieldInput
          control={formSale.control}
          description={formFieldsSale.total.description}
          label={formFieldsSale.total.label}
          name={'total'}
          placeholder={formFieldsSale.total.placeholder}
          readOnly={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(total)}
          </Badge>
        </FormFieldInput>
        <FormFieldInput
          control={formSale.control}
          description={formFieldsSale.quantity.description}
          label={formFieldsSale.quantity.label}
          name={'quantity'}
          placeholder={formFieldsSale.quantity.placeholder}
          readOnly={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(quantity)}
          </Badge>
        </FormFieldInput>
      </form>
    </Form>
  );
};
