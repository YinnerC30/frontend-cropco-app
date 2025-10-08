import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsCrop =
  | 'name'
  | 'description'
  | 'number_hectares'
  | 'units'
  | 'location'
  | 'date_of_creation'
  | 'amount'
  | 'date_of_termination';

export const formFieldsCrop: Record<FormFieldsCrop, CustomFormField> = {
  name: {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Cultivo 1',
    description: 'Nombre único del cultivo ',
  },
  description: {
    name: 'description',
    label: 'Descripción:',
    placeholder: 'El cultivo presenta las siguientes...',
    description: 'Información de interés sobre el cultivo',
  },
  number_hectares: {
    name: 'number_hectares',
    label: 'Número de hectáreas:',
    placeholder: '3',
    description: 'Cantidad de hectáreas que tiene el cultivo',
  },
  units: {
    name: 'units',
    label: 'Número de unidades:',
    placeholder: '1000',
    description: 'Cantidad de plantas u árboles que tiene el cultivo',
  },
  location: {
    name: 'location',
    label: 'Ubicación:',
    placeholder: 'A 1 Km de la escuela....',
    description: '',
  },
  date_of_creation: {
    name: 'date_of_creation',
    label: 'Fecha de creación:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se creó el cultivo',
  },
  date_of_termination: {
    name: 'date_of_termination',
    label: 'Fecha de terminación:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se terminó el cultivo',
  },
  amount: {
    name: 'harvests_stock.amount',
    label: 'Inventario actual: ',
    placeholder: '',
    description: '',
  },
};
