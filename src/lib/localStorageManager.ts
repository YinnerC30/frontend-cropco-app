/**
 * Utilidad genérica para manejar localStorage de forma tipada
 */
export class LocalStorageManager<T> {
  private key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  /**
   * Obtiene el valor del localStorage o retorna el valor por defecto
   */
  get(): T {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) {
        return this.defaultValue;
      }
      return { ...this.defaultValue, ...JSON.parse(data) };
    } catch (error) {
      console.warn(`Error parsing localStorage data for key "${this.key}":`, error);
      return this.defaultValue;
    }
  }

  /**
   * Guarda un valor en localStorage
   */
  save(value: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${this.key}":`, error);
    }
  }

  /**
   * Elimina el valor del localStorage
   */
  remove(): void {
    localStorage.removeItem(this.key);
  }

  /**
   * Obtiene una propiedad específica del objeto almacenado
   */
  getProperty<K extends keyof T>(property: K): T[K] {
    const data = this.get();
    return data[property];
  }

  /**
   * Actualiza solo algunas propiedades del objeto almacenado
   */
  updatePartial(updates: Partial<T>): void {
    const currentData = this.get();
    const updatedData = { ...currentData, ...updates };
    this.save(updatedData);
  }

  /**
   * Verifica si existe data en localStorage para esta clave
   */
  exists(): boolean {
    return localStorage.getItem(this.key) !== null;
  }
}

/**
 * Funciones helper para crear instancias de LocalStorageManager
 */
export const createLocalStorageManager = <T>(
  key: string,
  defaultValue: T
): LocalStorageManager<T> => {
  return new LocalStorageManager(key, defaultValue);
}; 