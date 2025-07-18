import { cleanup, render, screen } from '@/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersModuleActionsTable } from '../UsersModuleActionsTable';
import { UsersModuleProvider } from '../UsersModuleContext';

// Mock row data
const mockRow = {
  original: {
    id: 'user-1',
    email: 'test@example.com',
    is_active: true,
    roles: ['user'],
  },
};

// Mocks for context and hooks
const mockResetSelectionRows = vi.fn();
const mockMutateDeleteUser = vi.fn();
const mockMutateResetPassword = vi.fn();

const mockUseUsersModuleContext = vi.fn().mockReturnValue({
  dataTable: {
    resetSelectionRows: mockResetSelectionRows,
  },
  actionsUsersModule: {
    remove_one_user: true,
    update_one_user: true,
    reset_password_user: true,
    find_one_user: true,
    toggle_status_user: true,
  },
  mutationDeleteUser: {
    mutate: mockMutateDeleteUser,
    isPending: false,
  },
});

const mockUsePutResetPasswordUser = vi.fn().mockReturnValue({
  mutate: mockMutateResetPassword,
  isPending: false,
});

// Mocks for imported hooks
vi.mock('../../hooks', () => ({
  useUsersModuleContext: () => mockUseUsersModuleContext(),
}));

vi.mock('../../hooks/mutations', () => ({
  usePutResetPasswordUser: () => mockUsePutResetPasswordUser(),
}));

// Mocks for DropDownMenuActions and action components
vi.mock(
  '@/modules/core/components/data-table/menu/DropDownMenuActions',
  () => ({
    DropDownMenuActions: ({ children }: any) => (
      <div data-testid="dropdown-menu">{children}</div>
    ),
  })
);

vi.mock('@/modules/core/components/data-table/menu/actions', () => ({
  ActionCopyIdRecord: ({ id }: any) => (
    <button data-testid="copy-id">{id}</button>
  ),
  ActionDeleteRecord: ({ action, disabled }: any) => (
    <button data-testid="delete-record" disabled={disabled} onClick={action}>
      Delete
    </button>
  ),
  ActionModifyRecord: ({ id, disabled }: any) => (
    <button data-testid="modify-record" disabled={disabled}>
      Modify
    </button>
  ),
  ActionViewRecord: ({ id, disabled }: any) => (
    <button data-testid="view-record" disabled={disabled}>
      View
    </button>
  ),
}));

vi.mock('../ActionResetPassword', () => ({
  ActionResetPassword: ({ id, mutation, disabled, email }: any) => (
    <button
      data-testid="reset-password"
      disabled={disabled}
      onClick={() => mutation.mutate(id)}
    >
      Reset Password
    </button>
  ),
}));

vi.mock('../ActionToogleStatusUser', () => ({
  ActionToogleStatusUser: ({ id, status, disabled }: any) => (
    <button data-testid="toggle-status" disabled={disabled}>
      Toggle Status
    </button>
  ),
}));

describe('UsersModuleActionsTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    // Reset mock return values if needed
    mockUseUsersModuleContext.mockReturnValue({
      dataTable: {
        resetSelectionRows: mockResetSelectionRows,
      },
      actionsUsersModule: {
        remove_one_user: true,
        update_one_user: true,
        reset_password_user: true,
        find_one_user: true,
        toggle_status_user: true,
      },
      mutationDeleteUser: {
        mutate: mockMutateDeleteUser,
        isPending: false,
      },
    });
    mockUsePutResetPasswordUser.mockReturnValue({
      mutate: mockMutateResetPassword,
      isPending: false,
    });
  });

  it('should render all action buttons', () => {
    render(
      <UsersModuleProvider>
        <UsersModuleActionsTable row={mockRow as any} />
      </UsersModuleProvider>
    );

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(screen.getByTestId('copy-id')).toBeInTheDocument();
    expect(screen.getByTestId('delete-record')).toBeInTheDocument();
    expect(screen.getByTestId('modify-record')).toBeInTheDocument();
    expect(screen.getByTestId('reset-password')).toBeInTheDocument();
    expect(screen.getByTestId('view-record')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-status')).toBeInTheDocument();
  });

  //   it('should call delete user mutate and reset selection on delete', () => {
  //     render(
  //       <UsersModuleProvider>
  //         <UsersModuleActionsTable row={mockRow as any} />
  //       </UsersModuleProvider>
  //     );

  //     const deleteBtn = screen.getByTestId('delete-record');
  //     fireEvent.click(deleteBtn);

  //     expect(mockMutateDeleteUser).toHaveBeenCalledWith(
  //       'user-1',
  //       expect.objectContaining({
  //         onSuccess: expect.any(Function),
  //       })
  //     );

  //     // Simulate onSuccess callback
  //     const callArgs = mockMutateDeleteUser.mock.calls[0][1];
  //     callArgs.onSuccess();
  //     expect(mockResetSelectionRows).toHaveBeenCalled();
  //   });

  it('should disable actions for admin user', () => {
    const adminRow = {
      original: {
        id: 'admin-1',
        email: 'admin@example.com',
        is_active: true,
        roles: ['admin'],
      },
    };

    render(
      <UsersModuleProvider>
        <UsersModuleActionsTable row={adminRow as any} />
      </UsersModuleProvider>
    );

    expect(screen.getByTestId('delete-record')).toBeDisabled();
    expect(screen.getByTestId('modify-record')).toBeDisabled();
    expect(screen.getByTestId('reset-password')).toBeDisabled();
    expect(screen.getByTestId('toggle-status')).toBeDisabled();
  });

  it('should disable actions if permissions are false', () => {
    mockUseUsersModuleContext.mockReturnValue({
      dataTable: {
        resetSelectionRows: mockResetSelectionRows,
      },
      actionsUsersModule: {
        remove_one_user: false,
        update_one_user: false,
        reset_password_user: false,
        find_one_user: false,
        toggle_status_user: false,
      },
      mutationDeleteUser: {
        mutate: mockMutateDeleteUser,
        isPending: false,
      },
    });

    render(
      <UsersModuleProvider>
        <UsersModuleActionsTable row={mockRow as any} />
      </UsersModuleProvider>
    );

    expect(screen.getByTestId('delete-record')).toBeDisabled();
    expect(screen.getByTestId('modify-record')).toBeDisabled();
    expect(screen.getByTestId('reset-password')).toBeDisabled();
    expect(screen.getByTestId('view-record')).toBeDisabled();
    expect(screen.getByTestId('toggle-status')).toBeDisabled();
  });

  //   it('should call reset password mutation when reset password button is clicked', () => {
  //     render(
  //       <UsersModuleProvider>
  //         <UsersModuleActionsTable row={mockRow as any} />
  //       </UsersModuleProvider>
  //     );

  //     const resetBtn = screen.getByTestId('reset-password');
  //     fireEvent.click(resetBtn);

  //     expect(mockMutateResetPassword).toHaveBeenCalled();
  //   });
});
