import { Badge, Form } from '@/components';
import {
  FormFieldCalendar,
  FormFieldInput,
  FormFieldTextArea,
  Loading,
} from '@/modules/core/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useCreateForm } from '@/modules/core/hooks';
import { formFieldsHarvestProcessed } from '@/modules/harvests/utils/formFieldsHarvestProcessed';
import React from 'react';
import { z } from 'zod';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

const formSchema = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),
  }),
  total: z.coerce.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),
  value_pay: z.coerce
    .number({
      invalid_type_error: 'Debes introducir un valor numérico',
    })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un número que termine en 50 o 00.',
    }),
  observation: z
    .string()
    .max(100, {
      message: 'La observación no puede tener más de 100 caracteres.',
    })
    .optional(),
});

export const HarvestProcessedFields: React.FC = () => {
  const {
    queryOneHarvest: { data, isSuccess, isLoading },
  } = useHarvestProcessedContext();

  if (isLoading) {
    return <Loading />;
  }

  const form = useCreateForm({
    schema: formSchema,
    defaultValues: isSuccess
      ? data
      : {
          date: undefined,
          crop: {
            id: '',
          },
          total: 0,
          value_pay: 0,
          observation: '',
        },
  });

  return (
    <Form {...form}>
      <form className="pl-1">
        <FormFieldCalendar
          control={form.control}
          description={formFieldsHarvestProcessed.date.description}
          label={formFieldsHarvestProcessed.date.label}
          name={'date'}
          placeholder={formFieldsHarvestProcessed.date.placeholder}
          disabled={true}
        />

        <FormFieldInput
          control={form.control}
          description={formFieldsHarvestProcessed.crop.description}
          label={formFieldsHarvestProcessed.crop.label}
          name={'crop.name'}
          placeholder={formFieldsHarvestProcessed.crop.placeholder}
          disabled={true}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsHarvestProcessed.observation.description}
          label={formFieldsHarvestProcessed.observation.label}
          name={'observation'}
          placeholder={formFieldsHarvestProcessed.observation.placeholder}
          disabled={true}
          className="w-[300px]"
        />

        <FormFieldInput
          control={form.control}
          description={formFieldsHarvestProcessed.total.description}
          label={formFieldsHarvestProcessed.total.label}
          name={'total'}
          placeholder={formFieldsHarvestProcessed.total.placeholder}
          disabled={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(data?.total! ?? 0)}
          </Badge>
        </FormFieldInput>

        <FormFieldInput
          className=""
          control={form.control}
          description={formFieldsHarvestProcessed.value_pay.description}
          label={formFieldsHarvestProcessed.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsHarvestProcessed.value_pay.placeholder}
          disabled={true}
          type="number"
          hiddenInput
        >
          <Badge
            className="block h-8 text-base text-center w-28"
            variant={'indigo'}
          >
            {FormatMoneyValue(data?.value_pay! ?? 0)}
          </Badge>
        </FormFieldInput>
      </form>
    </Form>
  );
};
