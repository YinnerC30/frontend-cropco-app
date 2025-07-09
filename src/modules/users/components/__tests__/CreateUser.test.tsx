import { render } from '@/test-utils';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateUser } from '../CreateUser';

// Mock de dependencias del core
vi.mock('@/modules/core/components', () => {
  return {
    FormChangeProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="form-change-provider">{children}</div>
    ),
    BreadCrumb: ({ items, finalItem }: any) => (
      <nav data-testid="breadcrumb">
        {items?.map((item: any) => (
          <span key={item.link}>{item.name}</span>
        ))}
        <span>{finalItem}</span>
      </nav>
    ),
  };
});

// Mock de hooks del core
vi.mock('@/modules/core/hooks', () => ({
  useCreateForm: ({ defaultValues, schema }: any) => ({
    handleSubmit: (onSubmit: any) => (event: any) => {
      event?.preventDefault();
      // Simula los valores del formulario que coinciden con el schema
      const mockValues = {
        first_name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@email.com',
        cell_phone_number: '1234567890',
        passwords: { password1: '123456', password2: '123456' },
        actions: [],
        modules: [],
      };
      onSubmit(mockValues);
    },
    control: {},
    formState: { defaultValues },
    watch: () => [],
    setValue: vi.fn(),
    reset: vi.fn(),
    getValues: () => defaultValues,
  }),
  useGetAllModules: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}));

const mockMutate = vi.fn();
vi.mock('../hooks', () => ({
  usePostUser: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

vi.mock('../routes/pathsRoutes', () => ({
  MODULE_USER_PATHS: {
    ViewAll: '/usuarios',
  },
}));

// Mock real de los esquemas Zod
vi.mock('../utils', () => ({
  formSchemaUserWithPassword: {
    parse: vi.fn(),
    safeParse: vi.fn(),
  },
  formSchemaUser: {
    parse: vi.fn(),
    safeParse: vi.fn(),
  },
  formFieldsUser: {
    first_name: {
      label: 'Nombre',
      description: '',
      placeholder: 'Ingrese el nombre',
    },
    last_name: {
      label: 'Apellido',
      description: '',
      placeholder: 'Ingrese el apellido',
    },
    email: { label: 'Email', description: '', placeholder: 'Ingrese el email' },
    cell_phone_number: {
      label: 'Teléfono',
      description: '',
      placeholder: 'Ingrese el teléfono',
    },
    password1: {
      label: 'Contraseña',
      description: '',
      placeholder: 'Ingrese la contraseña',
    },
    password2: {
      label: 'Confirmar contraseña',
      description: '',
      placeholder: 'Confirme la contraseña',
    },
  },
}));

// Mock mejorado del formulario que simula el comportamiento real
vi.mock('../form', () => ({
  FormUser: ({ onSubmit, isSubmitting }: any) => {
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (onSubmit) {
        const mockFormData = {
          first_name: 'Juan',
          last_name: 'Pérez',
          email: 'juan@email.com',
          cell_phone_number: '1234567890',
          passwords: { password1: '123456', password2: '123456' },
          actions: [],
          modules: [],
        };
        onSubmit(mockFormData);
      }
    };

    return (
      <div data-testid="form-user">
        <form onSubmit={handleSubmit} id="formUser">
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="submit-button"
          >
            Guardar
          </button>
        </form>
      </div>
    );
  },
}));

// Mock completo del módulo @/auth
vi.mock('@/auth', async () => {
  const actual = await vi.importActual('@/auth');
  return {
    ...actual,
    useAuthContext: () => ({
      removeUser: vi.fn(),
      user: {
        id: 1,
        first_name: 'Test',
        last_name: 'User',
      },
      hasPermission: vi.fn().mockReturnValue(true),
    }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="auth-provider">{children}</div>
    ),
    TIME_QUESTION_RENEW_TOKEN: 300000,
  };
});

// Mock de React Router
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock de React Query
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
    }),
    useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
      mutate: mockMutate,
      isPending: false,
      mutationFn,
      onSuccess,
      onError,
    }),
  };
});

// Mock de sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock de auth context
vi.mock('@/auth/hooks', () => ({
  useAuthContext: () => ({
    handleError: vi.fn(),
  }),
}));

describe('CreateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renderiza el breadcrumb y el formulario correctamente', () => {
    render(<CreateUser />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('form-user')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Registro')).toBeInTheDocument();
  });

  it('llama a mutate con los datos correctos al enviar el formulario', () => {
    render(<CreateUser />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    // Verificar que mockMutate fue llamado con los datos transformados correctamente
    expect(mockMutate).toHaveBeenCalledWith({
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan@email.com',
      cell_phone_number: '1234567890',
      password: '123456', // Nota: se transforma de passwords.password1 a password
      actions: [],
      modules: [],
    });
  });

  it('pasa la prop isSubmitting correctamente al formulario', () => {
    // Para este test, simplemente verificaremos que el formulario recibe la prop isSubmitting
    render(<CreateUser />);

    // El formulario debería renderizarse sin errores
    const form = screen.getByTestId('form-user');
    expect(form).toBeInTheDocument();

    // El botón de submit debe estar habilitado cuando isPending es false
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).not.toBeDisabled();
  });

  it('transforma correctamente los datos del formulario antes de enviarlos', () => {
    render(<CreateUser />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Verificar que la transformación se hizo correctamente:
    // 1. Se extrajo passwords del objeto
    // 2. Se agregó password con el valor de passwords.password1
    // 3. Se mantuvieron el resto de propiedades
    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@email.com',
        cell_phone_number: '1234567890',
        password: '123456',
        actions: [],
        modules: [],
      })
    );

    // Verificar que no se envió el objeto passwords
    expect(mockMutate).not.toHaveBeenCalledWith(
      expect.objectContaining({
        passwords: expect.any(Object),
      })
    );
  });
});
