# CropCo - Sistema de Gestión Agrícola

CropCo es una aplicación web moderna diseñada para la gestión integral de operaciones agrícolas. Proporciona herramientas para el seguimiento de cultivos, gestión de personal, control de inventario, y análisis de datos en tiempo real.

## 🚀 Características Principales

- **Gestión de Cultivos**: Seguimiento y monitoreo de cultivos en tiempo real
- **Control de Inventario**: Gestión de insumos y recursos agrícolas
- **Gestión de Personal**: Control de empleados y asignación de trabajos
- **Análisis Financiero**: Seguimiento de ventas, compras y gastos
- **Dashboard Interactivo**: Visualización de métricas y KPIs importantes
- **Almacenamiento en la Nube**: Acceso a la información desde cualquier lugar

## 🛠️ Tecnologías Utilizadas

- React 18
- TypeScript
- Redux Toolkit
- TanStack Query
- TanStack Table
- Tailwind CSS
- Shadcn/ui
- Vite
- Docker

## 📋 Prerrequisitos

- Node.js (versión 20 o superior)
- npm o yarn
- Git
- Backend de CropCo ejecutándose localmente

## 🔄 Dependencia del Backend

Este proyecto frontend requiere que el backend de CropCo esté en ejecución. Por favor, asegúrate de:

1. Clonar y configurar el backend:
   ```bash
   git clone https://github.com/YinnerC30/backend-cropco-app.git
   cd backend-cropco-app
   ```

2. Seguir las instrucciones de instalación y configuración del backend en su [README](https://github.com/YinnerC30/backend-cropco-app/blob/ec2a30e8a93b996d97a148a8b77948b1e2e6c80d/README.md)

3. Asegurarte de que el backend esté ejecutándose antes de iniciar el frontend

## 🔧 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/YinnerC30/frontend-cropco-app.git
   cd frontend-cropco-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Linux
   cp .env.template .env

   # Windows
   Copy-Item -Path .env.template -Destination .env
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   Abre tu navegador y visita [http://localhost:5173](http://localhost:5173)

## 🐳 Ejecución con Docker

```bash
# Construir la imagen
docker build -t cropco-frontend .

# Ejecutar el contenedor
docker run -p 80:80 -e VITE_HOST_API_CROPCO=http://localhost:3000/ cropco-frontend:latest

# O usar la imagen pública
docker pull stivenc30/cropco-frontend
docker run -p 80:80 -e VITE_HOST_API_CROPCO=http://localhost:3000/ stivenc30/cropco-frontend
```

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Yinner Chilito** - _Desarrollo inicial_
