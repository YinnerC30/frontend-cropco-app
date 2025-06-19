# Sistema de Versionado - CropCo Frontend

Este documento describe cómo funciona el sistema de versionado automático de la aplicación CropCo Frontend.

## 📋 Índice

- [Tipos de Versión](#tipos-de-versión)
- [Workflows Automatizados](#workflows-automatizados)
- [Uso Local](#uso-local)
- [Configuración de GitHub Secrets](#configuración-de-github-secrets)
- [Estructura de Tags](#estructura-de-tags)

## 🏷️ Tipos de Versión

Seguimos el estándar [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):

- **PATCH** (1.0.0 → 1.0.1): Correcciones de bugs y cambios menores
- **MINOR** (1.0.0 → 1.1.0): Nuevas características compatibles hacia atrás
- **MAJOR** (1.0.0 → 2.0.0): Cambios incompatibles hacia atrás

## 🤖 Workflows Automatizados

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

Se ejecuta en cada push a `main` y `develop`:

- ✅ Ejecuta tests y linting
- 🐳 Construye imagen Docker con versión actual
- 📦 Publica en Docker Hub con tags:
  - `{username}/cropco-frontend:{version}`
  - `{username}/cropco-frontend:latest`
  - `{username}/cropco-frontend:main`

### 2. Release Workflow (`.github/workflows/release.yml`)

Se ejecuta manualmente o con tags:

- 🚀 Incrementa versión automáticamente
- 🐳 Construye y publica imagen Docker
- 📝 Crea release en GitHub
- 🏷️ Genera tags de Git

## 💻 Uso Local

### Script de Release

```bash
# Incrementar versión PATCH (1.0.0 → 1.0.1)
./scripts/release.sh patch

# Incrementar versión MINOR (1.0.0 → 1.1.0)
./scripts/release.sh minor

# Incrementar versión MAJOR (1.0.0 → 2.0.0)
./scripts/release.sh major
```

### Comandos NPM

```bash
# Incrementar versión
npm run version:patch
npm run version:minor
npm run version:major

# Construir Docker
npm run docker:build
npm run docker:build-latest

# Release completo
npm run release:patch
npm run release:minor
npm run release:major
```

## 🔐 Configuración de GitHub Secrets

Para que los workflows funcionen, configura estos secrets en tu repositorio:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Agrega los siguientes secrets:

```
DOCKER_USERNAME=tu-usuario-dockerhub
DOCKER_PASSWORD=tu-token-dockerhub
```

### Generar Token de Docker Hub

1. Ve a [Docker Hub](https://hub.docker.com/settings/security)
2. Crea un **Access Token**
3. Usa el token como `DOCKER_PASSWORD`

## 🏷️ Estructura de Tags

### Docker Images

```
{username}/cropco-frontend:1.0.0    # Versión específica
{username}/cropco-frontend:latest   # Última versión
{username}/cropco-frontend:main     # Versión de main
```

### Git Tags

```
v1.0.0    # Release oficial
v1.0.1    # Hotfix
v1.1.0    # Nueva feature
v2.0.0    # Breaking changes
```

## 🔄 Flujo de Trabajo Recomendado

### Para Features Nuevas

1. Crear branch desde `develop`
2. Desarrollar feature
3. Crear Pull Request a `develop`
4. Merge a `develop`
5. Cuando esté listo para release:
   - Merge `develop` a `main`
   - Ejecutar workflow de release manualmente

### Para Hotfixes

1. Crear branch desde `main`
2. Corregir bug
3. Crear Pull Request a `main`
4. Merge a `main`
5. Ejecutar workflow de release (patch)

## 📊 Monitoreo

### GitHub Actions

- Ve a la pestaña **Actions** en tu repositorio
- Revisa el estado de los workflows
- Descarga logs si hay errores

### Docker Hub

- Ve a tu repositorio en Docker Hub
- Revisa las tags publicadas
- Verifica que las imágenes se construyan correctamente

## 🚨 Troubleshooting

### Error: "Docker login failed"

- Verifica que `DOCKER_USERNAME` y `DOCKER_PASSWORD` estén configurados
- Asegúrate de que el token de Docker Hub sea válido

### Error: "Build failed"

- Revisa los logs del workflow
- Verifica que los tests pasen localmente
- Asegúrate de que el Dockerfile esté correcto

### Error: "Version already exists"

- Incrementa la versión manualmente en `package.json`
- O usa un tipo de versión diferente

## 📝 Notas Importantes

- ✅ Siempre ejecuta tests antes de hacer release
- ✅ Usa commits convencionales para mejor tracking
- ✅ Documenta cambios importantes en los releases
- ✅ Mantén `latest` siempre actualizada
- ✅ Usa tags específicos para producción 