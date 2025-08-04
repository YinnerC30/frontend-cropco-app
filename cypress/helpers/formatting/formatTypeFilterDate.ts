enum TypeFilterDate {
  AFTER = 'AFTER',
  BEFORE = 'BEFORE',
  EQUAL = 'EQUAL',
}
export const formatTypeFilterDate = (
  value: TypeFilterDate
): 'Después del ' | 'Antes del ' | 'El dia ' => {
  if (!value) {
    throw new Error('El valor de conversión es undefined');
  }
  const formatTypeFilterDate =
    value === TypeFilterDate.AFTER
      ? 'Después del '
      : value === TypeFilterDate.EQUAL
      ? 'El dia '
      : 'Antes del ';
  return formatTypeFilterDate;
};
