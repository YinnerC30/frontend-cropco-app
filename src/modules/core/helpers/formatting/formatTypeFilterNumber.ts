import { TypeFilterNumber } from '../../interfaces';

export const formatTypeFilterNumber = (
  value: TypeFilterNumber
): 'Mayor a:' | 'Menor a:' | 'Igual a:' => {
  if (!value) {
    throw new Error('El valor recibido es undefined');
  }
  const formatTypeFilterTotal =
    value === TypeFilterNumber.MAX
      ? 'Mayor a:'
      : value === TypeFilterNumber.MIN
      ? 'Menor a:'
      : 'Igual a:';
  return formatTypeFilterTotal;
};
