import { render } from '@/test-utils';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateUser } from '../CreateUser';

// Mock de dependencias del core
vi.mock(import('@/modules/core/components'), async (importOriginal) => {
  const actual = await importOriginal();
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
  };
});

const mockMutate = vi.fn();
vi.mock('../hooks', () => ({
  usePostUser: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
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
