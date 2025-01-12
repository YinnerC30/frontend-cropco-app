import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSearchBarPayment =
  | 'employee'
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date'
  | 'type_filter_total'
  | 'filter_by_total'
  | 'total'
  | 'filter_by_method_of_payment'
  | 'method_of_payment';

export const formFieldsSearchBarPayment: Record<
  FormFieldsSearchBarPayment,
  CustomFormField
> = {
  employee: {
    name: 'employee',
    label: 'Filtrar por empleado:',
    placeholder: 'Selecciona un empleado',
    description: 'Nombre del empleado al cual se le realizo el pago',
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

  filter_by_method_of_payment: {
    name: 'filter_by_method_of_payment',
    label: 'Filtrar por total pagos pendiente:',
    placeholder: '',
    description: 'Activa la opción para filtrar por este modo',
  },
  method_of_payment: {
    name: 'method_of_payment',
    label: 'Metodo de pago:',
    placeholder: 'Selecciona una opción',
    description: 'Filtrar registros por  metodo de pago',
  },
};
