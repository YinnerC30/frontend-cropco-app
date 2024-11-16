export const FormatNumber = (value: number) => {
  return new Intl.NumberFormat("es-CO").format(value);
};
