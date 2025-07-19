import { useFormSupplyContext } from '../../hooks';

import { Form } from '@/components';
import { FormFieldInput, FormFieldTextArea } from '@/modules/core/components';
import {
  FormFieldSelectWithGroups,
  SelectElement,
} from '@/modules/core/components/form/fields/FormFieldSelectWithGroups';
import {
  LengthUnitOfMeasure,
  MassUnitOfMeasure,
  UnitsType,
  VolumeUnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';
import { formFieldsSupply } from '../../utils';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';

export const FormSupplyFields = () => {
  const { form, onSubmit, readOnly, statusForm } = useFormSupplyContext();

  const { getUnitType } = useUnitConverter();

  const getElementsToSelectUnitOfMeasure = () => {
    if (statusForm !== 'update') {
      return [
        {
          groupName: 'Masa',
          elements: [
            {
              key: MassUnitOfMeasure.GRAMOS,
              value: MassUnitOfMeasure.GRAMOS,
              label: 'Gramos',
            },
            {
              key: MassUnitOfMeasure.LIBRAS,
              value: MassUnitOfMeasure.LIBRAS,
              label: 'Libras',
            },
            {
              key: MassUnitOfMeasure.KILOGRAMOS,
              value: MassUnitOfMeasure.KILOGRAMOS,
              label: 'Kilogramos',
            },
          ],
        },
        {
          groupName: 'Volumen',
          elements: [
            {
              key: VolumeUnitOfMeasure.MILILITROS,
              value: VolumeUnitOfMeasure.MILILITROS,
              label: 'Mililitros',
            },
            {
              key: VolumeUnitOfMeasure.LITROS,
              value: VolumeUnitOfMeasure.LITROS,
              label: 'Litros',
            },
            {
              key: VolumeUnitOfMeasure.GALONES,
              value: VolumeUnitOfMeasure.GALONES,
              label: 'Galones',
            },
          ],
        },
        {
          groupName: 'Longitud',
          elements: [
            {
              key: LengthUnitOfMeasure.MILIMETROS,
              value: LengthUnitOfMeasure.MILIMETROS,
              label: 'Milimetros',
            },
            {
              key: LengthUnitOfMeasure.CENTIMETROS,
              value: LengthUnitOfMeasure.CENTIMETROS,
              label: 'Centimetros',
            },
            {
              key: LengthUnitOfMeasure.METROS,
              value: LengthUnitOfMeasure.METROS,
              label: 'Metros',
            },
          ],
        },
      ];
    }
    const prevUnitOfMeasure = form.getValues('unit_of_measure');
    let elementsToShow: SelectElement[] = [];
    let groupNameToShow = '';
    let groupUnitOfMeasure = getUnitType(prevUnitOfMeasure);
    switch (groupUnitOfMeasure) {
      case 'mass':
        elementsToShow = UnitsType.GRAMOS;
        groupNameToShow = 'Masa';
        break;
      case 'volume':
        elementsToShow = UnitsType.MILILITROS;
        groupNameToShow = 'Volumen';
        break;
      case 'length':
        elementsToShow = UnitsType.MILIMETROS;
        groupNameToShow = 'Longitud';
        break;

      default:
        break;
    }

    return [
      {
        groupName: groupNameToShow,
        elements: elementsToShow,
      },
    ];
  };
  console.log('🚀 ~ FormSupplyFields ~ statusForm:', statusForm);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSupply"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          autoFocus
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
        <FormFieldSelectWithGroups
          groups={getElementsToSelectUnitOfMeasure()}
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
