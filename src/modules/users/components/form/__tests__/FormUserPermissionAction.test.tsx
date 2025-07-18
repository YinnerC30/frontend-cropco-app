import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormUserPermissionAction } from '../FormUserPermissionAction';
import { Action } from '@/modules/core/interfaces';
import { render } from '@/test-utils';

vi.mock('@/auth/helpers', () => ({
  CapitalizeFirstWord: (text: string) => text,
}));

const mockUseFormUserContext = vi
  .fn()
  .mockReturnValue({ updateActionsUserForm: vi.fn() });

vi.mock('@/modules/users/hooks', () => ({
  useFormUserContext: () => mockUseFormUserContext(),
}));

const mockUpdateActionsUserForm = vi.fn();

vi.mock('@/modules/users/hooks', () => ({
  useFormUserContext: () => ({
    updateActionsUserForm: mockUpdateActionsUserForm,
  }),
}));

describe('FormUserPermissionAction', () => {
  const action: Action = {
    id: '1',
    description: 'ver usuario',
    name: 'view_user',
    path_endpoint: 'view-user',
    is_visible: false,
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar la descripción de la acción', () => {
    const { getByText } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={false}
      />
    );
    expect(getByText('ver usuario')).toBeInTheDocument();
  });

  it('debe mostrar el switch como deshabilitado si readOnly es true', () => {
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={true}
        isChecked={false}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    expect(switchInput).toBeDisabled();
  });

  it('debe mostrar el switch como habilitado si readOnly es false', () => {
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={false}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    expect(switchInput).not.toBeDisabled();
  });

  it('debe marcar el switch si isChecked es true', () => {
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={true}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    expect(switchInput).toBeChecked();
  });

  it('debe desmarcar el switch si isChecked es false', () => {
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={false}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    expect(switchInput).not.toBeChecked();
  });

  it('debe llamar a updateActionsUserForm al cambiar el switch', () => {
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={false}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    fireEvent.click(switchInput);
    expect(mockUpdateActionsUserForm).toHaveBeenCalledWith([
      { id: action.id, isActive: true },
    ]);
  });

  it('debe llamar a updateActionsUserForm con isActive false al desactivar el switch', () => {
    // El switch inicia activado
    const { getByTestId } = render(
      <FormUserPermissionAction
        action={action}
        readOnly={false}
        isChecked={true}
      />
    );
    const switchInput = getByTestId('switch-action-view_user');
    fireEvent.click(switchInput);
    expect(mockUpdateActionsUserForm).toHaveBeenCalledWith([
      { id: action.id, isActive: false },
    ]);
  });
});
