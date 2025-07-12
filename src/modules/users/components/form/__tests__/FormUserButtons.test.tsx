import { render } from '@/test-utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormUserButtons } from '../FormUserButtons';

const mockUseFormUserContext = vi.fn();

vi.mock('@/auth/hooks/useAuthContext', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
  };
});

// Mock del contexto
vi.mock('@/modules/users/hooks', () => ({
  useFormUserContext: () => mockUseFormUserContext(),
}));

describe('FormUserButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar ButtonBack si readOnly es true', () => {
    mockUseFormUserContext.mockReturnValue({
      readOnly: true,
      isSubmitting: false,
    });

    const result = render(<FormUserButtons />);
    // ButtonBack renderiza un botón con el texto "Volver" (por convención)
    // Si el texto es diferente, ajusta el selector
    expect(result.getByTestId('form-back-button')).toBeInTheDocument();
  });

  it('debe mostrar ButtonsForm si readOnly es false', () => {
    mockUseFormUserContext.mockReturnValue({
      readOnly: false,
      isSubmitting: false,
    });

    render(<FormUserButtons />);
    // ButtonsForm renderiza un botón con el texto "Cancelar"
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
  });

  it('debe pasar isPending correctamente a ButtonsForm', () => {
    mockUseFormUserContext.mockReturnValue({
      readOnly: false,
      isSubmitting: true,
    });

    const result = render(<FormUserButtons />);
    // El botón de enviar debe estar deshabilitado si isPending es true
    // Suponiendo que ButtonsForm renderiza un botón de tipo submit
    const submitButton = result.getByTestId('form-submit-button');
    expect(submitButton).toBeDisabled();
  });

  //   it('debe navegar al módulo de usuarios al hacer click en ButtonBack', () => {
  //     // Simula el contexto de solo lectura
  //     mockUseFormUserContext.mockReturnValue({
  //       readOnly: true,
  //       isSubmitting: false,
  //     });

  //     // Mock de useNavigate
  //     const navigateMock = vi.fn();
  //     vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(
  //       navigateMock
  //     );

  //     render(<FormUserButtons />);
  //     const button = screen.getByRole('button');
  //     fireEvent.click(button);
  //     // No podemos comprobar la navegación real, pero podemos comprobar que el handler se llama
  //     // El handler navega a MODULE_USER_PATHS.ViewAll
  //     // Si ButtonBack llama a handleNavigation, este a su vez llama a navigate
  //     // Por lo tanto, deberíamos comprobar que navigateMock fue llamado
  //     // Pero como el mock está en el closure, este test es ilustrativo
  //   });
});
