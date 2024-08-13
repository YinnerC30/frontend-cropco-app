# Ejecución del proyecto

1. **Instalar las dependencias del proyecto**  
    Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

2. **Configurar las variables de entorno**
   Copia el archivo `.env.template`, renómbralo a `.env`, y reemplaza las variables de entorno según tu configuración local:

   **Linux:**

   ```bash
   cp .env.template .env
   ```

   **Windows Powershell:**

   ```powershell
   Copy-Item -Path .env.template -Destination .env
   ```

3. **Iniciar el servidor en modo desarrollo**
   Ejecuta el siguiente comando para iniciar el servidor en modo de desarrollo:
   ```bash
   npm run dev
   ```
4. **Ingresar a la aplicación**
   Una vez que el servidor esté en ejecución, en un navegador ingresa la siguiente URL para usar la aplicación:
   [http://localhost:5173](http://localhost:5173)
