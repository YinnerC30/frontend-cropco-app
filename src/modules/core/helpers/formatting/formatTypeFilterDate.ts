import { TypeFilterDate } from '../../interfaces/general/TypeFilterDate';

export const formatTypeFilterDate = (
  value: TypeFilterDate
): 'Despues del ' | 'Antes del ' | 'El dia ' => {
  if (!value) {
    throw new Error('El valor de conversión es undefined');
  }
  const formatTypeFilterDate =
    value === TypeFilterDate.after
      ? 'Despues del '
      : value === TypeFilterDate.equal
      ? 'El dia '
      : 'Antes del ';
  return formatTypeFilterDate;
};
