import { TypeFilterDate } from '../general/TypeFilterDate';
import { TypeFilterNumber } from '../general/TypeFilterNumber';

export const numberFilterOptions = [
  {
    key: TypeFilterNumber.MIN,
    value: TypeFilterNumber.MIN,
    label: 'Menor a',
  },
  {
    key: TypeFilterNumber.EQUAL,
    value: TypeFilterNumber.EQUAL,
    label: 'Igual a',
  },
  {
    key: TypeFilterNumber.MAX,
    value: TypeFilterNumber.MAX,
    label: 'Mayor a',
  },
];

export const dateFilterOptions = [
  {
    key: TypeFilterDate.equal,
    value: TypeFilterDate.equal,
    label: 'El día',
  },
  {
    key: TypeFilterDate.after,
    value: TypeFilterDate.after,
    label: 'Despues del',
  },
  {
    key: TypeFilterDate.before,
    value: TypeFilterDate.before,
    label: 'Antes del',
  },
];
