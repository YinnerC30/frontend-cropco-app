export const getEnvironmentVariables = () => {
  // @ts-ignore
  const env = window.ENV || {};
  
  let hostApiCropco = env.VITE_HOST_API_CROPCO;
  console.log('🚀 ~ getEnvironmentVariables ~ hostApiCropco:', hostApiCropco);
  let statusProject = env.VITE_STATUS_PROJECT;
  console.log('🚀 ~ getEnvironmentVariables ~ statusProject:', statusProject);

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
