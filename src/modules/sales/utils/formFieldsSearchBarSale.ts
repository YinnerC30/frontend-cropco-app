import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSearchBarSale =
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date'
  | 'filter_by_total'
  | 'type_filter_total'
  | 'total'
  | 'filter_by_quantity'
  | 'type_filter_quantity'
  | 'quantity'
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
  filter_by_total: {
    name: 'filter_by_total',
    label: 'Filtrar por total:',
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
  filter_by_quantity: {
    name: 'filter_by_quantity',
    label: 'Filtrar por cantidad:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  type_filter_quantity: {
    name: 'type_filter_quantity',
    label: 'Valor menor o mayor a:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por menor o mayor del valor',
  },
  quantity: {
    name: 'quantity',
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
