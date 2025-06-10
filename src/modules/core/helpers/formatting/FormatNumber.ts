export const FormatNumber = (
  value: number,
  isInteger: boolean = true
): string => {
  const options: Intl.NumberFormatOptions = {
    maximumFractionDigits: isInteger ? 0 : 4,
    minimumFractionDigits: isInteger ? 0 : 4,
  };

  return new Intl.NumberFormat('es-CO', options).format(value);
};
