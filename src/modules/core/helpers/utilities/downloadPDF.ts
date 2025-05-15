export const downloadPDF = (data: Blob, namePDF: string): void => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${namePDF}.pdf`);
  document.body.appendChild(link);
  link.click();
  link?.parentNode?.removeChild(link);
};
