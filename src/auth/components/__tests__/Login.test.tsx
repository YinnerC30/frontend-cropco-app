import { render, screen, fireEvent, waitFor, cleanup } from '@/test-utils';
import { setupTestEnvironment } from '@/test-utils';

// Importaciones de vitest
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';

// Importar y extender matchers de jest-dom manualmente
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Componente a probar
import { Login } from '../Login';

// Mock del hook useLoginUser
const mockMutate = vi.fn();
let mockIsPending = false;

vi.mock('@/auth/hooks/mutations/useLoginUser', () => ({
  useLoginUser: () => ({
    mutate: mockMutate,
    isPending: mockIsPending,
  }),
}));

// Mock del hook useDocumentTitle para evitar efectos secundarios
vi.mock('@/modules/core/hooks/useDocumentTitle', () => ({
  default: vi.fn(),
}));

// Mock de toast para evitar efectos secundarios
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    setupTestEnvironment();
    mockIsPending = false;
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('debería renderizar el componente correctamente', async () => {
    render(<Login />);

    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Ingresa tu usuario y contraseña para acceder a tu cuenta'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('CropCo')).toBeInTheDocument();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });

  it('debería mostrar los campos de email y contraseña', async () => {
    render(<Login />);

    expect(screen.getByText('Correo electrónico:')).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('email@google.com');
    expect(emailInput).toBeInTheDocument();
    expect(screen.getByText('Contraseña:')).toBeInTheDocument();
    const passInput = screen.getByPlaceholderText('mypass1234');
    expect(passInput).toBeInTheDocument();
  });

  it('debería alternar la visibilidad de la contraseña al hacer clic en el botón', async () => {
    render(<Login />);

    expect(screen.getByText('Contraseña:')).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('mypass1234');
    expect(passwordInput).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: 'show-pass' });
    expect(toggleButton).toBeInTheDocument();
    // Inicialmente la contraseña debería estar oculta
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Hacer clic en el botón para mostrar la contraseña
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Hacer clic nuevamente para ocultar la contraseña
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('debería enviar el formulario con los datos correctos', async () => {
    render(<Login />);

    expect(screen.getByText('Ingresar')).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText('email@google.com');
    const passwordInput = screen.getByPlaceholderText('mypass1234');
    const submitButton = screen.getByText('Ingresar');

    // Llenar el formulario
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Enviar el formulario
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('debería mostrar el ícono de carga cuando isPending es true', async () => {
    // Mock temporal para isPending = true
    mockIsPending = true;

    render(<Login />);

    const submitButton = screen.getByText('Ingresar');
    expect(submitButton).toBeDisabled();
    const reloadIcon = screen.getByLabelText('icon-animate-spin');
    expect(reloadIcon).toBeInTheDocument();
    expect(reloadIcon).toHaveClass('animate-spin');
  });

  it('debería validar campos requeridos', async () => {
    render(<Login />);

    await waitFor(() => {
      expect(screen.getByText('Ingresar')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Ingresar');

    // Intentar enviar sin datos
    fireEvent.click(submitButton);

    // Esperar a que se muestren los errores de validación
    await waitFor(() => {
      // Verificar que no se llamó a mutate porque hay errores de validación
      expect(mockMutate).not.toHaveBeenCalled();
      expect(
        screen.getByText(/El correo electrónico no es valido/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Debes ingresar la contraseña/i)
      ).toBeInTheDocument();
    });
  });
});
