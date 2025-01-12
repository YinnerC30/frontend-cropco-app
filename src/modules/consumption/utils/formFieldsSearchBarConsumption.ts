import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type FormFieldsSearchBarConsumption =
  | 'filter_by_date'
  | 'type_filter_date'
  | 'date';

export const formFieldsSearchBarConsumption: Record<
  FormFieldsSearchBarConsumption,
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
};
