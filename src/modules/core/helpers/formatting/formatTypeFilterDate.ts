import { TypeFilterDate } from '../../interfaces/general/TypeFilterDate';

export const formatTypeFilterDate = (
  value: TypeFilterDate
): 'Despues del ' | 'Antes del ' => {
  if (!value) {
    throw new Error('El valor de conversión es undefined');
  }
  const formatTypeFilterDate =
    value === TypeFilterDate.after ? 'Despues del ' : 'Antes del ';
  return formatTypeFilterDate;
};
