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

# Obtener la versión del package.json
ARG VERSION
RUN if [ -z "$VERSION" ]; then VERSION=$(node -p "require('./package.json').version"); fi && echo "Building version: $VERSION"

# tests
RUN npm run test

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Instalar node para el script de inicio
RUN apk add --no-cache nodejs

# Crear script de inicio
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "window.ENV = { VITE_HOST_API_CROPCO: \"$VITE_HOST_API_CROPCO\", VITE_STATUS_PROJECT: \"$VITE_STATUS_PROJECT\" }" > /usr/share/nginx/html/env-config.js' >> /docker-entrypoint.sh && \
    echo 'echo "window.APP_VERSION = \"$APP_VERSION\";" >> /usr/share/nginx/html/env-config.js' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Copia la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia los archivos de construcción desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Variables de entorno para la versión
ARG VERSION
ENV APP_VERSION=${VERSION}

# Expone el puerto 80
EXPOSE 80

# Usar el script de inicio
CMD ["/docker-entrypoint.sh"]