import { TypeFilterDate } from '../general/TypeFilterDate';
import { TypeFilterNumber } from '../general/TypeFilterNumber';

export const numberFilterOptions = [
  {
    key: TypeFilterNumber.LESS_THAN,
    value: TypeFilterNumber.LESS_THAN,
    label: 'Menor a',
  },
  {
    key: TypeFilterNumber.EQUAL,
    value: TypeFilterNumber.EQUAL,
    label: 'Igual a',
  },
  {
    key: TypeFilterNumber.GREATER_THAN,
    value: TypeFilterNumber.GREATER_THAN,
    label: 'Mayor a',
  },
];

export const dateFilterOptions = [
  {
    key: TypeFilterDate.EQUAL,
    value: TypeFilterDate.EQUAL,
    label: 'El día',
  },
  {
    key: TypeFilterDate.AFTER,
    value: TypeFilterDate.AFTER,
    label: 'Despues del',
  },
  {
    key: TypeFilterDate.BEFORE,
    value: TypeFilterDate.BEFORE,
    label: 'Antes del',
  },
];
