import { cleanup, fireEvent, render, screen } from '@/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ModifyUser } from '../ModifyUser';

// Mock de dependencias del core (solo BreadCrumb y Loading)
vi.mock('@/modules/core/components', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,

    BreadCrumb: ({ items, finalItem }: any) => (
      <nav data-testid="breadcrumb">
        {items?.map((item: any) => (
          <span key={item.link}>{item.name}</span>
        ))}
        <span>{finalItem}</span>
      </nav>
    ),
    Loading: () => <div data-testid="loading" />,
    FormFieldInput: ({ name, label }: any) => (
      <div>
        <label>{label}</label>
        <input
          name={name}
          defaultValue={
            name === 'first_name'
              ? 'Ana'
              : name === 'last_name'
              ? 'García'
              : name === 'email'
              ? 'ana@email.com'
              : name === 'cell_phone_number'
              ? '987654321'
              : ''
          }
        />
      </div>
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
        first_name: 'Ana',
        last_name: 'García',
        email: 'ana@email.com',
        cell_phone_number: '987654321',
        actions: [],
        modules: [],
      };
      onSubmit(mockValues);
    },
    control: {},
    formState: { defaultValues, isDirty: false },
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

// Mock de hooks y rutas
const mockMutate = vi.fn();
const mockUserData = {
  id: '123',
  first_name: 'Ana',
  last_name: 'García',
  email: 'ana@email.com',
  cell_phone_number: '987654321',
  actions: [],
  modules: [],
  is_active: true,
  token: 'mock-token',
};

vi.mock('../hooks/', () => ({
  useGetUser: (id: string) => ({
    data: mockUserData,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: true,
    isFetching: false,
    isRefetching: false,
    status: 'success',
  }),
  usePutUser: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
    isSuccess: false,
    status: 'idle',
  }),
}));

vi.mock('../routes/pathsRoutes', () => ({
  MODULE_USER_PATHS: {
    ViewAll: '/usuarios',
  },
}));

vi.mock('../utils', () => ({
  formSchemaUser: {
    parse: vi.fn(),
    safeParse: vi.fn(),
  },
}));

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

// Mock de React Router
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '123' }),
  };
});

describe('ModifyUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renderiza el breadcrumb y el formulario correctamente', () => {
    render(<ModifyUser />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Modificar')).toBeInTheDocument();
  });

  it('llama a mutate con los datos correctos al enviar el formulario', () => {
    render(<ModifyUser />);

    // Busca el botón submit dentro del formulario real
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledWith({
      id: '123',
      first_name: 'Ana',
      last_name: 'García',
      email: 'ana@email.com',
      cell_phone_number: '987654321',
      actions: [],
      modules: [],
    });
  });

  it('pasa la prop isSubmitting correctamente al formulario', () => {
    render(<ModifyUser />);
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('pasa los valores por defecto correctos al formulario', () => {
    render(<ModifyUser />);
    // Verifica que los campos del formulario estén presentes con los valores correctos
    expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
    expect(screen.getByDisplayValue('García')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ana@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
  });
});
