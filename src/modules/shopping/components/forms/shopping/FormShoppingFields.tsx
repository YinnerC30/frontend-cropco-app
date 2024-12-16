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

export const FormShoppingFields = () => {
  const { form, onSubmit, readOnly, total } = useFormShoppingContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          // Fix: No se envia ID de harvestDetail
          const data = form.watch();
          onSubmit(data);
        })}
        id="formShopping"
        className=""
      >
        <FormFieldCalendar
          control={form.control}
          description={formFieldsShopping.date.description}
          label={formFieldsShopping.date.label}
          name={'date'}
          placeholder={formFieldsShopping.date.placeholder}
          readOnly={readOnly}
        />
        <div className="sm:w-[600px] mt-4">
          <FormFieldDataTable
            control={form.control}
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
          control={form.control}
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
