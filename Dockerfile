# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Aumentar el límite de memoria antes de la compilación
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se servirá la aplicación
EXPOSE 4173

# Comando para iniciar la aplicación
CMD ["npm", "run", "preview"]