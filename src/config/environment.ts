/**
 * Configuración de entorno para la aplicación
 * Detecta automáticamente si estamos en desarrollo o producción
 */

export const ENVIRONMENT = {
  // Detecta si estamos en desarrollo
  isDevelopment: import.meta.env.DEV,

  // Detecta si estamos en producción
  isProduction: import.meta.env.PROD,

  // Dominio base según el entorno
  get baseDomain(): string {
    if (this.isDevelopment) {
      return 'localhost';
    }
    // En producción, usa el dominio configurado
    return import.meta.env.VITE_BASE_DOMAIN || 'cropco.org';
  },

  // URL base completa
  get baseUrl(): string {
    const protocol = this.isDevelopment ? 'http' : 'https';
    const port = this.isDevelopment ? ':5173' : '';
    return `${protocol}://${this.baseDomain}${port}`;
  },

  // Configuración para subdominios
  subdomain: {
    // Dominios permitidos para subdominios
    allowedDomains: ['cropco.org', 'localhost'],

    // Verifica si un dominio está permitido para subdominios
    isAllowedDomain(domain: string): boolean {
      return this.allowedDomains.includes(domain);
    },
  },
};

export default ENVIRONMENT;
