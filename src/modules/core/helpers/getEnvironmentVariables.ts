export const getEnvironmentVariables = () => {
  // Intentar obtener las variables de entorno de Vite primero
  let hostApiCropco = import.meta.env.VITE_HOST_API_CROPCO;
  let statusProject = import.meta.env.VITE_STATUS_PROJECT;

  // Si no están disponibles en Vite, intentar obtenerlas de window.ENV (para Docker)
  if (!hostApiCropco || !statusProject) {
    // @ts-ignore
    const env = window.ENV || {};
    hostApiCropco = hostApiCropco || env.VITE_HOST_API_CROPCO;
    statusProject = statusProject || env.VITE_STATUS_PROJECT;
  }

  // Valores por defecto si no se encuentran las variables
  if (!hostApiCropco) {
    console.log('No hay variable de entorno para hostApiCropco');
    hostApiCropco = 'http://localhost:3000/';
  }
  if (!statusProject) {
    console.log('No hay variable de entorno para statusProject');
    statusProject = 'development';
  }

  return {
    HOST_API_CROPCO: hostApiCropco,
    STATUS_PROJECT: statusProject,
  };
};
