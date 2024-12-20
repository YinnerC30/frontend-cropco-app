export const viewPDF = (data: Blob):void => {
  const url = window.URL.createObjectURL(data);
  window.open(url, '_blank');
  window.URL.revokeObjectURL(url);
};
