import { useFormSupplyContext } from '../../hooks';

import { Form } from '@/components';
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldTextArea,
} from '@/modules/core/components';
import {
  MassUnitOfMeasure,
  VolumeUnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';
import { formFieldsSupply } from '../../utils';

export const FormSupplyFields = () => {
  const { form, onSubmit, readOnly } = useFormSupplyContext();

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
          disabled={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupply.brand.description}
          label={formFieldsSupply.brand.label}
          name={'brand'}
          placeholder={formFieldsSupply.brand.placeholder}
          disabled={readOnly}
        />
        <FormFieldSelect
          items={[
            {
              key: MassUnitOfMeasure.GRAMOS,
              value: MassUnitOfMeasure.GRAMOS,
              label: 'Gramos',
            },
            {
              key: VolumeUnitOfMeasure.MILILITROS,
              value: VolumeUnitOfMeasure.MILILITROS,
              label: 'Mililitros',
            },
          ]}
          control={form.control}
          description={formFieldsSupply.unit_of_measure.description}
          label={formFieldsSupply.unit_of_measure.label}
          name={'unit_of_measure'}
          placeholder={formFieldsSupply.unit_of_measure.placeholder}
          disabled={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsSupply.observation.description}
          label={formFieldsSupply.observation.label}
          name={'observation'}
          placeholder={formFieldsSupply.observation.placeholder}
          disabled={readOnly}
          className="sm:w-2/4"
        />
      </form>
    </Form>
  );
};
