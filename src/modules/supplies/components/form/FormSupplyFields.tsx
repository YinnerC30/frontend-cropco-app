import { useFormSupplyContext } from '../../hooks';

import { Form } from '@/components';
import { FormFieldInput, FormFieldTextArea } from '@/modules/core/components';
import {
  FormFieldSelectWithGroups,
  SelectElement,
} from '@/modules/core/components/form/fields/FormFieldSelectWithGroups';
import { unitTypeMap } from '@/modules/core/hooks/useUnitConverter';
import { UnitOfMeasure, UnitsType } from '../../interfaces/UnitOfMeasure';
import { formFieldsSupply } from '../../utils';

export const FormSupplyFields = () => {
  const { form, onSubmit, readOnly, statusForm } = useFormSupplyContext();

  const getElementsToSelectUnitOfMeasure = () => {
    // TODO: Refactorizar para mayor eficiencia
    if (statusForm !== 'update') {
      return [
        {
          groupName: 'Masa',
          elements: UnitsType.MASS,
        },
        {
          groupName: 'Volumen',
          elements: UnitsType.VOLUME,
        },
        {
          groupName: 'Longitud',
          elements: UnitsType.LENGTH,
        },
      ];
    }
    const prevUnitOfMeasure = form.getValues('unit_of_measure');
    let elementsToShow: SelectElement[] = [];
    let groupNameToShow = '';
    let groupUnitOfMeasure = unitTypeMap[prevUnitOfMeasure as UnitOfMeasure];
    switch (groupUnitOfMeasure) {
      case 'MASS':
        elementsToShow = UnitsType.MASS;
        groupNameToShow = 'Masa';
        break;
      case 'VOLUME':
        elementsToShow = UnitsType.VOLUME;
        groupNameToShow = 'Volumen';
        break;
      case 'LENGTH':
        elementsToShow = UnitsType.LENGTH;
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
