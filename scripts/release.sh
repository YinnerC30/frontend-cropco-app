#!/bin/bash

# Script de release para CropCo Frontend
# Uso: ./scripts/release.sh [patch|minor|major]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  CropCo Frontend Release Tool${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Obtener el tipo de versión
VERSION_TYPE=${1:-patch}

if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    print_error "Tipo de versión inválido. Usa: patch, minor, o major"
    echo "Uso: $0 [patch|minor|major]"
    exit 1
fi

print_header

# Obtener la versión actual
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_message "Versión actual: $CURRENT_VERSION"

# Verificar si hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Hay cambios sin commitear. ¿Deseas continuar? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_message "Release cancelado."
        exit 0
    fi
fi

# Ejecutar tests
print_message "Ejecutando tests..."
npm test

# Ejecutar linting
print_message "Ejecutando linting..."
npm run lint

# Incrementar versión
print_message "Incrementando versión ($VERSION_TYPE)..."
npm run version:$VERSION_TYPE

# Obtener la nueva versión
NEW_VERSION=$(node -p "require('./package.json').version")
print_message "Nueva versión: $NEW_VERSION"

# Construir la aplicación
print_message "Construyendo aplicación..."
npm run build

# Construir imagen Docker
print_message "Construyendo imagen Docker..."
docker build -t cropco-frontend:$NEW_VERSION .
docker tag cropco-frontend:$NEW_VERSION cropco-frontend:latest

print_message "Imagen Docker construida:"
echo "  - cropco-frontend:$NEW_VERSION"
echo "  - cropco-frontend:latest"

# Crear tag de Git
print_message "Creando tag de Git..."
git add package.json
git commit -m "chore(release): bump version to $NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

print_message "Release completado exitosamente!"
print_message "Para publicar:"
echo "  1. git push origin main"
echo "  2. git push --tags"
echo "  3. docker push cropco-frontend:$NEW_VERSION"
echo "  4. docker push cropco-frontend:latest" 