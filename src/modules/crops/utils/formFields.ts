import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';

export const formFields: Record<string, CustomFormField> = {
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
  units: {
    name: 'units',
    label: 'Número de unidades:',
    placeholder: '1000',
    description: 'Cantidad de plantas u arboles que tiene el cultivo',
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
    placeholder: '',
    description: 'Fecha en la que se creo el cultivo',
  },
  date_of_termination: {
    name: 'date_of_termination',
    label: 'Fecha de terminación:',
    placeholder: '',
    description: 'Fecha en la que se termino el cultivo',
  },
};
