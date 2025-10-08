enum TypeFilterNumber {
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  EQUAL = 'EQUAL',
}

export const formatTypeFilterNumber = (
  value: TypeFilterNumber
): 'Mayor a:' | 'Menor a:' | 'Igual a:' => {
  if (!value) {
    throw new Error('El valor recibido es undefined');
  }
  const formatTypeFilterTotal =
    value === TypeFilterNumber.GREATER_THAN
      ? 'Mayor a:'
      : value === TypeFilterNumber.LESS_THAN
      ? 'Menor a:'
      : 'Igual a:';
  return formatTypeFilterTotal;
};
