import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { render } from '@/test-utils';
import { NavElement } from '../NavElement';
import { Route } from '@/routes/components/RoutesNavBar';

// Crear variables hoisted para los mocks
const mockUseFormChange = vi.hoisted(() => vi.fn());
const mockUseToastDiscardChanges = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());

// Mock de los hooks
vi.mock('@/modules/core/components/form/FormChangeContext', () => ({
  useFormChange: mockUseFormChange,
}));

vi.mock('@/modules/core/hooks/useToastDiscardChanges', () => ({
  useToastDiscardChanges: mockUseToastDiscardChanges,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NavElement', () => {
  const mockRoute: Route = {
    name_module: 'Module Name',
    label: 'Test Route',
    Icon: <span data-testid="test-icon">🚀</span>,
    path: '/test-path',
  };

  const mockShowToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Configurar mocks por defecto
    mockUseFormChange.mockReturnValue({
      hasUnsavedChanges: false,
    });

    mockUseToastDiscardChanges.mockReturnValue({
      showToast: mockShowToast,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renderiza correctamente con la ruta proporcionada', () => {
    render(<NavElement route={mockRoute} />, { withFormChange: false });

    expect(screen.getByText('Test Route')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renderiza con className personalizada', () => {
    const customClassName = 'custom-nav-class';
    render(<NavElement route={mockRoute} className={customClassName} />, {
      withFormChange: false,
    });

    const navElement = screen.getByText('Test Route').closest('div');
    expect(navElement).toHaveClass(customClassName);
  });

  it('navega directamente cuando no hay cambios pendientes', async () => {
    render(<NavElement route={mockRoute} />, { withFormChange: false });

    const navLink = screen.getByText('Test Route').closest('a');
    fireEvent.click(navLink!);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/test-path');
    });
  });

  it('muestra toast de advertencia cuando hay cambios pendientes', async () => {
    // Configurar el mock para simular cambios pendientes
    mockUseFormChange.mockReturnValue({ hasUnsavedChanges: true });

    render(<NavElement route={mockRoute} />, { withFormChange: false });

    const navLink = screen.getByText('Test Route').closest('a');
    fireEvent.click(navLink!);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        route: '/test-path',
        skipRedirection: false,
      });
    });

    // El click sí ocurre, pero no debe cambiar de ruta
    expect(mockNavigate).not.toHaveBeenCalledWith('/test-path');
  });

  it('previene la navegación automática del NavLink', async () => {
    render(<NavElement route={mockRoute} />, { withFormChange: false });

    const navLink = screen.getByText('Test Route').closest('a');
    const preventDefaultSpy = vi.fn();

    fireEvent.click(navLink!, { preventDefault: preventDefaultSpy });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/test-path');
    });
  });

  it('ejecuta onClick callback cuando se proporciona', () => {
    const onClickMock = vi.fn();
    render(<NavElement route={mockRoute} onClick={onClickMock} />, {
      withFormChange: false,
    });

    const navElement = screen.getByText('Test Route').closest('div');
    fireEvent.click(navElement!);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('aplica clases CSS correctas al NavLink', () => {
    render(<NavElement route={mockRoute} />, { withFormChange: false });

    const navLink = screen.getByText('Test Route').closest('a');
    expect(navLink).toHaveClass('flex', 'gap-1', 'p-1');
  });

  it('funciona correctamente con rutas que tienen caracteres especiales', () => {
    const specialRoute: Route = {
      name_module: 'Module Name',
      label: 'Ruta Especial & Test',
      Icon: <span data-testid="special-icon">⭐</span>,
      path: '/ruta-especial/test-123',
    };

    render(<NavElement route={specialRoute} />, { withFormChange: false });

    expect(screen.getByText('Ruta Especial & Test')).toBeInTheDocument();
    expect(screen.getByTestId('special-icon')).toBeInTheDocument();
  });
});
