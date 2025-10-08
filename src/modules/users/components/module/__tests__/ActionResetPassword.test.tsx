import { DataTableMenuActionsProvider } from '@/modules/core/components';
import { render, screen, fireEvent, waitFor, cleanup } from '@/test-utils';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { ActionResetPassword } from '../ActionResetPassword';

// Definición de los mocks
const mockMutate = vi.fn();

// Mock simple de la mutación
const mockMutation = {
  mutate: mockMutate,
  isPending: false,
  isError: false,
  isSuccess: false,
  error: null,
  data: undefined,
  reset: vi.fn(),
  mutateAsync: vi.fn(),
  variables: undefined,
  context: undefined,
  failureCount: 0,
  failureReason: null,
  isIdle: true,
  isPaused: false,
  status: 'idle' as const,
  submittedAt: 0,
  setData: vi.fn(),
  setError: vi.fn(),
  setVariables: vi.fn(),
  getMeta: vi.fn(),
  getContext: vi.fn(),
  getData: vi.fn(),
  getError: vi.fn(),
  getFailureCount: vi.fn(),
  getFailureReason: vi.fn(),
  getIsError: vi.fn(),
  getIsIdle: vi.fn(),
  getIsLoading: vi.fn(),
  getIsPaused: vi.fn(),
  getIsPending: vi.fn(),
  getIsSuccess: vi.fn(),
  getStatus: vi.fn(),
  getSubmittedAt: vi.fn(),
  getVariables: vi.fn(),
};

const defaultProps = {
  id: 'user-1',
  mutation: mockMutation as any,
  disabled: false,
  email: 'test@email.com',
};

// Mock de sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock de navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('ActionResetPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('debe renderizar el botón de contraseña', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword
          disabled={false}
          id={'4343434dsdsds'}
          mutation={mockMutation as any}
          email={'test@email.com'}
        />
      </DataTableMenuActionsProvider>
    );

    // El botón "Contraseña" está dentro del DropdownMenuItem, necesitamos abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Contraseña')).toBeInTheDocument();
  });

  it('debe abrir el diálogo al hacer click en el botón', async () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...defaultProps} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Ahora hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    expect(
      await screen.findByText('Restablecimiento de contraseña')
    ).toBeInTheDocument();
  });

  it('debe mostrar el email en el input', async () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...defaultProps} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    expect(screen.getByDisplayValue(defaultProps.email)).toBeInTheDocument();
  });

  it('debe llamar a mutate al hacer click en Restablecer', async () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...defaultProps} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    const btn = screen.getByText('Restablecer');
    fireEvent.click(btn);

    expect(mockMutate).toHaveBeenCalledWith(
      defaultProps.id,
      expect.any(Object)
    );
  });

  it('debe mostrar la nueva contraseña y permitir copiarla', async () => {
    // Simula que la mutación retorna una nueva contraseña
    mockMutate.mockImplementation((_id, { onSuccess }) => {
      onSuccess({ data: { password: 'NuevaPass123' } });
    });

    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...defaultProps} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    // Hacer click en "Restablecer"
    fireEvent.click(screen.getByText('Restablecer'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('NuevaPass123')).toBeInTheDocument();
    });

    // Botón de copiar
    const copyBtn = screen.getByTestId('btn-copy-pass');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('NuevaPass123');
  });

  it('debe deshabilitar el botón Restablecer si isPending es true', () => {
    const propsWithPending = {
      ...defaultProps,
      mutation: { ...mockMutation, isPending: true } as any,
    };

    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...propsWithPending} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    expect(screen.getByText('Restablecer')).toBeDisabled();
  });

  it('debe cerrar el diálogo al hacer click en el botón de cerrar', async () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionResetPassword {...defaultProps} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón "Contraseña"
    fireEvent.click(screen.getByText('Contraseña'));

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(
        screen.queryByText('Restablecimiento de contraseña')
      ).not.toBeInTheDocument();
    });
  });
});
