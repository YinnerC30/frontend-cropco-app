import { Badge, Form, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import {
  FormFieldCalendar,
  FormFieldDataTable,
  FormFieldInput,
} from '@/modules/core/components';
import { FormatMoneyValue } from '@/modules/core/helpers';

import { useFormSaleContext } from '@/modules/sales/hooks/context/useFormSaleContext';
import { formFieldsSale } from '@/modules/sales/utils';
import { MassUnitOfMeasure, UnitsType } from '@/modules/supplies/interfaces/UnitOfMeasure';
import React from 'react';
import { FormSaleDataTable } from './FormSaleDataTable';

export const FormSaleFields: React.FC = () => {
  const { formSale, onSubmit, readOnly, value_pay, amount, unitTypeToShowAmount, setUnitTypeToShowAmount } =
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
          <div className="flex items-center w-auto gap-2 py-4">
              <Badge
                className="block h-8 text-base text-center w-28"
                variant={'cyan'}
              >
                {Number.isInteger(amount) ? amount : amount.toFixed(2)}
              </Badge>

              <Select
                onValueChange={(value: any) => {
                  setUnitTypeToShowAmount(value);
                }}
                defaultValue={MassUnitOfMeasure.KILOGRAMOS}
                value={unitTypeToShowAmount}
                disabled={readOnly}
              >
                <SelectTrigger /* ref={field.ref} */>
                  <SelectValue placeholder={'Selecciona una medida'} />
                </SelectTrigger>

                <SelectContent>
                  {[...UnitsType['GRAMOS']].map((item: any) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
        </FormFieldInput>
      </form>
    </Form>
  );
};
