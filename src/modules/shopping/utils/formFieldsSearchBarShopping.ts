import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSearchBarShopping =
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date'
  | 'filter_by_value_pay'
  | 'type_filter_value_pay'
  | 'value_pay'
  | 'supplies'
  | 'suppliers';

export const formFieldsSearchBarShopping: Record<
  FormFieldsSearchBarShopping,
  CustomFormField
> = {
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
    label: 'Filtrar por value_pay:',
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
  suppliers: {
    name: 'suppliers',
    label: 'Proveedores:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
  supplies: {
    name: 'supplies',
    label: 'Insumos:',
    placeholder: '',
    description: 'Valor de referencia para realizar la búsqueda',
  },
};
