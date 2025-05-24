import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSearchBarWork =
  | 'crop'
  | 'employees'
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date'
  | 'filter_by_value_pay'
  | 'type_filter_value_pay'
  | 'value_pay';

export const formFieldsSearchBarWork: Record<
  FormFieldsSearchBarWork,
  CustomFormField
> = {
  crop: {
    name: 'crop',
    label: 'Filtrar por cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Nombre del cultivo al cual se le realizo el trabajo',
  },
  employees: {
    name: 'employees',
    label: 'Filtrar por empleados:',
    placeholder: 'Selecciona empleado(s)',
    description: 'Nombre de empleado(s) que participo en la cosecha',
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
  filter_by_value_pay: {
    name: 'filter_by_value_pay',
    label: 'Filtrar por value_pay a pagar:',
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
    label: 'Valor a pagar:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
};
