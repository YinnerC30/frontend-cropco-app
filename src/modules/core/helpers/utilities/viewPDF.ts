export const viewPDF = (data: Blob) => {
  const url = window.URL.createObjectURL(data);
  window.open(url, '_blank');
  window.URL.revokeObjectURL(url);
};
