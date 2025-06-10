import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSearchBarSale =
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date'
  | 'filter_by_value_pay'
  | 'type_filter_value_pay'
  | 'value_pay'
  | 'filter_by_amount'
  | 'type_filter_amount'
  | 'type_unit_of_measure'
  | 'amount'
  | 'filter_by_is_receivable'
  | 'is_receivable'
  | 'clients'
  | 'crops';

export const formFieldsSearchBarSale: Record<
  FormFieldsSearchBarSale,
  CustomFormField
> = {
  clients: {
    name: 'clients',
    label: 'Filtrar por clientes:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  crops: {
    name: 'crops',
    label: 'Filtrar por cultivos:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
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
    label: 'Valor a pagar:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
  filter_by_amount: {
    name: 'filter_by_amount',
    label: 'Filtrar por cantidad:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  type_filter_amount: {
    name: 'type_filter_amount',
    label: 'Valor menor o mayor a:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por menor o mayor del valor',
  },
  type_unit_of_measure: {
    name: 'type_unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona una opción',
    description: 'Unidad de medida de la cantidad vendida',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad vendida:',
    placeholder: '100',
    description: 'Valor de referencia para realizar la búsqueda',
  },
  filter_by_is_receivable: {
    name: 'filter_by_is_receivable',
    label: 'Filtrar por pendiente de pago:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  is_receivable: {
    name: 'is_receivable',
    label: '¿Pendiente de pago?',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar pagos pendientes',
  },
};
