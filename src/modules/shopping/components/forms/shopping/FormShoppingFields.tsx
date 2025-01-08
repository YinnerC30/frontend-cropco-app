import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable,
  FormFieldInput,
} from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { formFieldsShopping } from '@/modules/shopping/utils';
import { FormShoppingDataTable } from './FormShoppingDataTable';

export const FormShoppingFields: React.FC = () => {
  const { formShopping, onSubmit, readOnly, total } = useFormShoppingContext();

  return (
    <Form {...formShopping}>
      <form
        onSubmit={formShopping.handleSubmit(onSubmit)}
        id="formShopping"
        className=""
      >
        <FormFieldCalendar
          control={formShopping.control}
          description={formFieldsShopping.date.description}
          label={formFieldsShopping.date.label}
          name={'date'}
          placeholder={formFieldsShopping.date.placeholder}
          readOnly={readOnly}
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={formShopping.control}
            description={''}
            label={formFieldsShopping.details.label}
            name={'details'}
            placeholder={''}
            readOnly={readOnly}
          >
            <FormShoppingDataTable />
          </FormFieldDataTable>
        </div>
        <FormFieldInput
          control={formShopping.control}
          description={formFieldsShopping.total.description}
          label={formFieldsShopping.total.label}
          name={'total'}
          placeholder={formFieldsShopping.total.placeholder}
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
      </form>
    </Form>
  );
};
