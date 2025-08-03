import { Dialog } from '@/components';
import { render } from '@/test-utils';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { DialogChangePassword } from '../DialogChangePassword';

describe('DialogChangePassword', () => {
  const handleCloseDialog = vi.fn();
  const setOpenDialog = vi.fn();
  const mutate = vi.fn();
  const defaultProps = {
    id: 'user-id-123',
    handleCloseDialog,
    setOpenDialog,
    isPending: false,
    mutate,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renderiza correctamente los campos y botones', () => {
    const result = render(
      <Dialog open={true}>
        <DialogChangePassword {...defaultProps} />
      </Dialog>
    );

    expect(result.getByText('Cambio de contraseña')).toBeInTheDocument();
    expect(
      result.getByText(/A continuación siga las instrucciónes del formulario/i)
    ).toBeInTheDocument();

    expect(result.getByText('Vieja contraseña')).toBeInTheDocument();
    expect(result.getByText('Nueva contraseña')).toBeInTheDocument();

    const guardarBtn = result.getByRole('button', { name: /Guardar/i });
    expect(guardarBtn).toBeInTheDocument();
    expect(guardarBtn).not.toBeDisabled();
  });

  it('deshabilita el botón Guardar cuando isPending es true', () => {
    const { getByRole } = render(
      <Dialog open={true}>
        <DialogChangePassword {...defaultProps} isPending={true} />
      </Dialog>
    );

    const guardarBtn = getByRole('button', { name: /Guardar/i });
    expect(guardarBtn).toBeDisabled();
  });

  it('llama a mutate con los valores correctos al enviar el formulario', async () => {
    const result = render(
      <Dialog open={true}>
        <DialogChangePassword {...defaultProps} />
      </Dialog>
    );

    const oldPasswordInput = result.getByTestId('input-old-pass');
    const newPasswordInput = result.getByTestId('input-new-pass');
    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    const guardarBtn = result.getByRole('button', { name: /Guardar/i });

    fireEvent.change(oldPasswordInput, { target: { value: 'antigua123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'nueva456' } });

    fireEvent.click(guardarBtn);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith(
        {
          id: defaultProps.id,
          old_password: 'antigua123',
          new_password: 'nueva456',
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  it('cierra el diálogo al hacer click en el botón de cerrar', () => {
    const { getByRole } = render(
      <Dialog open={true}>
        <DialogChangePassword {...defaultProps} isPending={true} />
      </Dialog>
    );
    const closeBtn = getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);
    expect(handleCloseDialog).toHaveBeenCalled();
  });

  it('cierra el diálogo al éxito del cambio de contraseña', async () => {
    const localMutate = vi.fn((_, { onSuccess }) => onSuccess && onSuccess());
    const { getByRole, getByTestId } = render(
      <Dialog open={true}>
        <DialogChangePassword {...defaultProps} mutate={localMutate} />
      </Dialog>
    );

    fireEvent.change(getByTestId('input-old-pass'), {
      target: { value: 'antigua123' },
    });
    fireEvent.change(getByTestId('input-new-pass'), {
      target: { value: 'nueva456' },
    });

    fireEvent.click(getByRole('button', { name: /Guardar/i }));

    await waitFor(() => {
      expect(setOpenDialog).toHaveBeenCalledWith(false);
    });
  });
});
