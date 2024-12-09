import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

export const formFieldsSearchBarHarvest: Record<string, CustomFormField> = {
  crop: {
    name: 'crop',
    label: 'Filtrar por cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Nombre del cultivo al cual se le realizo la cosecha',
  },
  filter_by_date: {
    name: 'filter_by_date',
    label: 'Filtrar por fecha:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  type_filter_date: {
    name: 'type_filter_date',
    label: 'Tiempo de la fecha:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por antes o después de la fecha',
  },
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha de referencia para realizar la búsqueda',
  },
  filter_by_total: {
    name: 'filter_by_total',
    label: 'Filtrar por total cosechado:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  type_filter_total: {
    name: 'type_filter_total',
    label: 'Valor menor o mayor a:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por menor o mayor del valor',
  },
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
  filter_by_value_pay: {
    name: 'filter_by_value_pay',
    label: 'Filtrar por valor a pagar:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  type_filter_value_pay: {
    name: 'type_filter_value_pay',
    label: 'Valor menor o mayor a:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por menor o mayor del valor',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Total:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
};
