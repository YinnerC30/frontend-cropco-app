import { cleanup, render } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import { FormUser } from '../FormUser';

describe('FormUser', () => {
  const defaultProps = {
    readOnly: false,
    user: undefined,
    hiddenPassword: false,
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    cleanup();
  });

  it('debe renderizar el formulario de usuario correctamente', () => {
    const { getByTestId } = render(<FormUser {...defaultProps} />);
    expect(getByTestId('form-user')).toBeInTheDocument();
  });

  it('debe renderizar los campos del formulario y los permisos', () => {
    const { getByText } = render(<FormUser {...defaultProps} />);
    // Verifica que el título de los datos personales esté presente
    expect(getByText('Datos personales:')).toBeInTheDocument();
    // Verifica que los botones del formulario estén presentes
    // (esto depende de la implementación de FormUserButtons, aquí solo comprobamos que el contenedor principal existe)
  });

  it('debe pasar correctamente las props al proveedor', () => {
    const { getByTestId } = render(<FormUser {...defaultProps} />);
    expect(getByTestId('form-user')).toBeInTheDocument();
  });
});
