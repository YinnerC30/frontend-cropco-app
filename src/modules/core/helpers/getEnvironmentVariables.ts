export const getEnvironmentVariables = () => ({
  HOST_API_CROPCO:
    import.meta.env.VITE_HOST_API_CROPCO ||
    ('http://localhost:3000/' as string),
  STATUS_PROJECT:
    import.meta.env.VITE_STATUS_PROJECT || ('development' as string),
});
