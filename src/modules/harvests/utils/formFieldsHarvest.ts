import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';
type HarvestFormFields =
  | 'date'
  | 'crop'
  | 'amount'
  | 'value_pay'
  | 'details'
  | 'observation'
  | 'amount_processed';
export const formFieldsHarvest: Record<HarvestFormFields, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la cosecha',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Nombre del cultivo al cual se le realizo la cosecha',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad:',
    placeholder: '',
    description: 'Número cosechado',
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
  details: {
    name: 'details',
    label: 'Cosechas realizadas por empleado:',
    placeholder: '',
    description: '',
  },
  amount_processed: {
    name: 'amount_processed',
    label: 'Cantidad de cosecha procesada:',
    placeholder: '',
    description: 'Número de kilogramos disponibles para la venta',
  },
};
