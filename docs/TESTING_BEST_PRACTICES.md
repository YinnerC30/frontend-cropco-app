# Mejores Prácticas para Pruebas - Evitar Renderizados Múltiples

## Problema Común

Los componentes de React pueden renderizarse múltiples veces durante las pruebas debido a:

1. **Efectos secundarios** en hooks personalizados
2. **Cambios de estado** en providers
3. **Re-fetching automático** de React Query
4. **Validaciones de formularios** que se ejecutan en cada renderizado
5. **Efectos de limpieza** que no se ejecutan correctamente

## Soluciones Implementadas

### 1. Utilidades de Prueba (`src/test-utils.tsx`)

```typescript
import { render, screen, fireEvent, waitFor } from '@/test-utils';
import { setupTestEnvironment } from '@/test-utils';

// Usar en lugar de @testing-library/react
render(<MiComponente />);
```

**Beneficios:**
- QueryClient optimizado para pruebas
- Providers configurados automáticamente
- Limpieza automática del estado

### 2. Configuración de Vitest (`vitest.config.ts`)

```typescript
test: {
  pool: 'forks',
  poolOptions: {
    forks: {
      singleFork: true, // Mejor aislamiento
    },
  },
}
```

### 3. Setup Global (`src/test-setup.ts`)

- Mocks globales para APIs del navegador
- Limpieza automática después de cada prueba
- Supresión de warnings innecesarios

## Patrones Recomendados

### 1. Usar `waitFor` para Esperar Estabilización

```typescript
it('debería renderizar correctamente', async () => {
  render(<MiComponente />);
  
  await waitFor(() => {
    expect(screen.getByText('Texto')).toBeInTheDocument();
  });
});
```

### 2. Limpiar Estado Entre Pruebas

```typescript
beforeEach(() => {
  setupTestEnvironment();
  // Configurar mocks específicos
});

afterEach(() => {
  vi.clearAllMocks();
});
```

### 3. Mockear Hooks con Efectos Secundarios

```typescript
// Mock de hooks que cambian el título del documento
vi.mock('@/modules/core/hooks/useDocumentTitle', () => ({
  default: vi.fn(),
}));

// Mock de toast para evitar efectos secundarios
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));
```

### 4. Configurar QueryClient para Pruebas

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity, // Evita re-fetching
      gcTime: Infinity,    // Mantiene cache
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: false,
    },
  },
});
```

## Casos Específicos

### Formularios con React Hook Form

```typescript
// Mock del hook useCreateForm si causa problemas
vi.mock('@/modules/core/hooks/useCreateForm', () => ({
  useCreateForm: (config: any) => {
    const form = useForm(config);
    return {
      ...form,
      // Sobrescribir métodos problemáticos si es necesario
    };
  },
}));
```

### Providers con Estado Complejo

```typescript
// Renderizar sin providers específicos si causan problemas
render(<MiComponente />, {
  withAuth: false,
  withFormChange: false,
});
```

### Componentes con Animaciones

```typescript
// Mock de librerías de animación
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));
```

## Debugging de Renderizados Múltiples

### 1. Usar React DevTools Profiler

```typescript
// En desarrollo, agregar logging
if (process.env.NODE_ENV === 'development') {
  console.log('Componente renderizado:', new Date().toISOString());
}
```

### 2. Verificar Dependencias de useEffect

```typescript
// Asegurar que las dependencias sean estables
useEffect(() => {
  // Efecto
}, [dependency]); // dependency debe ser estable
```

### 3. Usar React.memo para Optimización

```typescript
const MiComponente = React.memo(({ prop1, prop2 }) => {
  // Componente
});
```

## Comandos Útiles

```bash
# Ejecutar pruebas con modo watch
npm run test:watch

# Ejecutar pruebas específicas
npm run test Login.test.tsx

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas en modo verbose
npm run test -- --verbose
```

## Checklist para Nuevas Pruebas

- [ ] Usar `@/test-utils` en lugar de `@testing-library/react`
- [ ] Implementar `waitFor` para esperar estabilización
- [ ] Mockear hooks con efectos secundarios
- [ ] Limpiar estado en `beforeEach` y `afterEach`
- [ ] Verificar que no hay re-renderizados innecesarios
- [ ] Usar `setupTestEnvironment()` para limpieza completa
- [ ] Configurar timeouts apropiados para pruebas asíncronas

## Recursos Adicionales

- [React Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Configuration](https://vitest.dev/config/)
- [React Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing) 