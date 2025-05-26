# Etapa de construcción
FROM node:20-alpine AS builder
# Establece el directorio de trabajo
WORKDIR /app
# Copia los archivos de dependencias
COPY package*.json ./
# Instala las dependencias
RUN npm ci
# Copia el resto del código fuente
COPY . .
# Aumentar el límite de memoria para la compilación
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Construye la aplicación
RUN npm run build


# Etapa de producción
FROM nginx:alpine
# Copia la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia los archivos de construcción desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html
# Expone el puerto 80
EXPOSE 80
# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]