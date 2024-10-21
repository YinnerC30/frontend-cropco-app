import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getReportClients = async () => {
  const response = await cropcoAPI.get(
    `${pathsCropco.clients}/export/all/pdf`,
    {
      responseType: 'blob', // Indicamos que la respuesta será un archivo binario (blob)
    }
  );

  return response.data; // Retornamos solo el blob (contenido del PDF)
};
