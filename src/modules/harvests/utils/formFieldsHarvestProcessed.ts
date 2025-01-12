import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type HarvestProcessedFormFields =
  | 'date'
  | 'crop'
  | 'total'
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
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: 'Número de kilogramos listos para la venta',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: 'Cantidad total a pagar por la cosecha',
  },
  observation: {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se cosecho hasta...',
    description: 'Comentario u observación sobre la cosecha realizada',
  },
};
