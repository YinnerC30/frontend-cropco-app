import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type HarvestProcessedFormFields =
  | 'date'
  | 'crop'
  | 'unit_of_measure'
  | 'amount'
  | 'value_pay'
  | 'observation';

export const formFieldsHarvestProcessed: Record<
  HarvestProcessedFormFields,
  CustomFormField
> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se esta agregando la cantidad al monto',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Cultivo al cual pertenece el monto',
  },
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida de la cosecha procesada',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad:',
    placeholder: '',
    description: 'Cantidad procesada',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: 'Valor a pagar por la cosecha',
  },
  observation: {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se cosecho hasta...',
    description: 'Comentario u observación sobre la cosecha realizada',
  },
};
