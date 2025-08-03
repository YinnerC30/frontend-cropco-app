import { render } from '@/test-utils';
import { cleanup, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FormUserFieldsPermissions } from '../FormUserFieldsPermissions';

const mockUseFormUserContext = vi.fn();

vi.mock('@/modules/users/hooks', () => ({
  useFormUserContext: () => mockUseFormUserContext(),
}));

vi.mock('@/auth/helpers', () => {
  return {
    CapitalizeFirstWord: vi.fn(),
  };
});

describe('FormUserFieldsPermissions', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el título y el switch global', () => {
    mockUseFormUserContext.mockReturnValue({
      queryModules: { data: [] },
      handleSelectAllActions: vi.fn(),
      handleInselectAllActions: vi.fn(),
      readOnly: false,
      isSelectedAllActions: false,
    });

    const result = render(<FormUserFieldsPermissions />);

    expect(result.getByText('Permisos:')).toBeInTheDocument();
    expect(result.getByText('Activar todos los permisos')).toBeInTheDocument();
    expect(result.getByTestId('switch-global-actions')).toBeInTheDocument();
  });

  it('debe ocultar el switch global si readOnly es true', async () => {
    mockUseFormUserContext.mockReturnValue({
      queryModules: { data: [] },
      handleSelectAllActions: vi.fn(),
      handleInselectAllActions: vi.fn(),
      readOnly: true,
      isSelectedAllActions: false,
    });

    const result = render(<FormUserFieldsPermissions />);

    expect(
      result.queryByTestId('switch-global-actions')
    ).not.toBeInTheDocument();
    // El switch global no debe estar visible
    expect(
      result.queryByText('Activar todos los permisos')
    ).not.toBeInTheDocument();
  });

  it('debe renderizar los módulos y sus acciones', () => {
    const modules = [
      {
        label: 'Usuarios',
        name: 'users',
        actions: [
          { id: 1, name: 'Ver' },
          { id: 2, name: 'Editar' },
        ],
      },
      {
        label: 'Roles',
        name: 'roles',
        actions: [{ id: 3, name: 'Crear' }],
      },
    ];
    mockUseFormUserContext.mockReturnValue({
      queryModules: { data: modules },
      handleSelectAllActions: vi.fn(),
      handleInselectAllActions: vi.fn(),
      readOnly: false,
      isSelectedAllActions: false,
      IsSelectedAllActionsInModule: vi.fn(),
      userHasAction: vi.fn(),
    });

    const result = render(<FormUserFieldsPermissions />);
    expect(result.getByText('Usuarios')).toBeInTheDocument();
    expect(result.getByText('Roles')).toBeInTheDocument();
    expect(result.getAllByText('Activar todo').length).toBe(2);
  });

  it('debe llamar a handleSelectAllActions al activar el switch global', () => {
    const handleSelectAllActions = vi.fn();
    const handleInselectAllActions = vi.fn();
    mockUseFormUserContext.mockReturnValue({
      queryModules: { data: [] },
      handleSelectAllActions,
      handleInselectAllActions,
      readOnly: false,
      isSelectedAllActions: false,
    });

    const result = render(<FormUserFieldsPermissions />);
    const switchGlobal = result.getByTestId('switch-global-actions');
    fireEvent.click(switchGlobal);
    expect(handleSelectAllActions).toHaveBeenCalled();
  });

  it('debe llamar a handleInselectAllActions al desactivar el switch global', () => {
    const handleSelectAllActions = vi.fn();
    const handleInselectAllActions = vi.fn();
    mockUseFormUserContext.mockReturnValue({
      queryModules: { data: [] },
      handleSelectAllActions,
      handleInselectAllActions,
      readOnly: false,
      isSelectedAllActions: true,
    });

    const result = render(<FormUserFieldsPermissions />);
    const switchGlobal = result.getByTestId('switch-global-actions');
    fireEvent.click(switchGlobal);
    expect(handleInselectAllActions).toHaveBeenCalled();
  });
});
