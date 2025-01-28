export const viewPDF = (data: Blob, namePDF = 'report-generic'): void => {
  const file = new File([data], namePDF, { type: data.type });
  const url = window.URL.createObjectURL(file); //  <-- Usar 'file' en vez de 'data'
  window.open(url, '_blank');
  window.URL.revokeObjectURL(url);
};