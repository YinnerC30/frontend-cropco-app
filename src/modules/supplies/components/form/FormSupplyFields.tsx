import { useFormSupplyContext } from '../../hooks';

import { Form } from '@/components';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextArea,
} from '@/modules/core/components';
import { formFieldsSupply } from '../../utils';
import { UnitOfMeasure } from '../../interfaces/UnitOfMeasure';

export const FormSupplyFields = () => {
  const { form, onSubmit, readOnly } = useFormSupplyContext();

  console.log(form.formState);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSupply"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsSupply.name.description}
          label={formFieldsSupply.name.label}
          name={'name'}
          placeholder={formFieldsSupply.name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupply.brand.description}
          label={formFieldsSupply.brand.label}
          name={'brand'}
          placeholder={formFieldsSupply.brand.placeholder}
          readOnly={readOnly}
        />
        <FormFieldSelect
          items={[
            {
              key: UnitOfMeasure.GRAMOS,
              value: UnitOfMeasure.GRAMOS,
              label: 'Gramos',
            },
            {
              key: UnitOfMeasure.MILILITROS,
              value: UnitOfMeasure.MILILITROS,
              label: 'Mililitros',
            },
          ]}
          control={form.control}
          description={formFieldsSupply.unit_of_measure.description}
          label={formFieldsSupply.unit_of_measure.label}
          name={'unit_of_measure'}
          placeholder={formFieldsSupply.unit_of_measure.placeholder}
          readOnly={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsSupply.observation.description}
          label={formFieldsSupply.observation.label}
          name={'observation'}
          placeholder={formFieldsSupply.observation.placeholder}
          readOnly={readOnly}
        />
      </form>
    </Form>
  );
};
