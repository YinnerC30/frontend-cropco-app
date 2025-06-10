import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsConsumptionDetail =
  | 'supply'
  | 'crop'
  | 'amount'
  | 'unit_of_measure';

export const formFieldsConsumptionDetail: Record<
  FormFieldsConsumptionDetail,
  CustomFormField
> = {
  supply: {
    name: 'supply',
    label: 'Insumo:',
    placeholder: 'Selecciona un insumo',
    description: 'Insumo a consumir',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Seleccione un cultivo',
    description: 'Cultivo al cual se insumo el insumo',
  },
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida que posee el insumo',
  },
  amount: {
    name: 'amount',
    label: 'Monto:',
    placeholder: '0',
    description: 'Cantidad a consumir (mililitros o gramos)',
  },
};
