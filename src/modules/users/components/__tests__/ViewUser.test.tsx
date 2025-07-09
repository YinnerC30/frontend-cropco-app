import { cleanup, render, screen } from '@/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ViewUser from '../ViewUser';

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
    FormFieldInput: ({ name, label, readOnly }: any) => (
      <div>
        <label>{label}</label>
        <input
          data-testid={`input-${name}`}
          readOnly
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
// const mockMutate = vi.fn();
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
  // usePutUser: () => ({
  //   mutate: mockMutate,
  //   isPending: false,
  //   isError: false,
  //   error: null,
  //   isSuccess: false,
  //   status: 'idle',
  // }),
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
    // useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
    //   mutate: mockMutate,
    //   isPending: false,
    //   mutationFn,
    //   onSuccess,
    //   onError,
    // }),
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

describe('ViewUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renderiza el breadcrumb y el formulario correctamente', () => {
    render(<ViewUser />);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Volver')).toBeInTheDocument();
  });

  it('pasa la prop readOnly correctamente al formulario', () => {
    render(<ViewUser />);

    const inputNombre = screen.getByTestId('input-first_name');
    const inputApellido = screen.getByTestId('input-last_name');
    const inputEmail = screen.getByTestId('input-email');
    const inputTelefono = screen.getByTestId('input-cell_phone_number');

    expect(inputNombre).toHaveAttribute('readonly');
    expect(inputApellido).toHaveAttribute('readonly');
    expect(inputEmail).toHaveAttribute('readonly');
    expect(inputTelefono).toHaveAttribute('readonly');

    // Verifica que el botón de guardar no esté presente o esté deshabilitado
    const submitButton = screen.queryByRole('button', { name: /guardar/i });
    expect(submitButton).toBeNull();
  });

  it('pasa los valores por defecto correctos al formulario', () => {
    render(<ViewUser />);
    // Verifica que los campos del formulario estén presentes con los valores correctos
    expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
    expect(screen.getByDisplayValue('García')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ana@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
  });
});
