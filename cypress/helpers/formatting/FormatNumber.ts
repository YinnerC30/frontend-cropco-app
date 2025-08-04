export const FormatNumber = (value: number | string): string => {
  // Convertir a número si es string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Verificar si es un número válido
  if (isNaN(numValue)) {
    return '0,00';
  }

  // Formatear el número con separadores de miles y decimales
  return numValue.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
