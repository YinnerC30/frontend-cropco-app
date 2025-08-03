import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UsersTable } from '../UsersTable';
import { render } from '@/test-utils';
import { UsersModuleProvider } from '../UsersModuleContext';
import React from 'react';

// Mock de los hooks que usa el UsersModuleProvider
const mockDataTable = {
  table: {
    getHeaderGroups: vi.fn(() => []),
    getRowModel: vi.fn(() => ({ rows: [] })),
    getState: vi.fn(() => ({ pagination: { pageIndex: 0 } })),
    getPageCount: vi.fn(() => 1),
  },
  lengthColumns: 5,
};

const mockQueryUsers = {
  data: {
    total_row_count: 10,
    records: [],
  },
  isLoading: false,
  isRefetching: false,
  isSuccess: true,
};

const mockActionsUsersModule = {
  find_all_users: true,
  find_one_user: true,
};

const mockMutationDeleteUsers = {
  isPending: false,
};

const mockMutationDeleteUser = {
  isPending: false,
};

const mockPagination = { pageIndex: 0, pageSize: 10 };
const mockSetPagination = vi.fn();

// Mock de los hooks utilizados por el provider
// vi.mock('@/modules/core/hooks/', () => ({}));

vi.mock('@/modules/core/hooks/', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useBasicQueryData: () => ({ value: '' }),
    useDataTableManual: () => mockDataTable,
    useCreateColumnsTable: () => [],
  };
});

vi.mock('../../hooks', () => ({
  useGetAllUsers: () => ({
    query: mockQueryUsers,
    pagination: mockPagination,
    setPagination: mockSetPagination,
  }),
  useDeleteBulkUsers: () => mockMutationDeleteUsers,
  useDeleteUser: () => mockMutationDeleteUser,
}));

vi.mock('@/auth/hooks', () => ({
  useAuthContext: () => ({
    getActionsModule: () => mockActionsUsersModule,
  }),
}));

vi.mock('../columnsTableUsers', () => ({
  columnsTableUsers: [],
}));

vi.mock('../UsersModuleActionsTable', () => ({
  UsersModuleActionsTable: () => <div>Actions</div>,
}));

// // Mock del componente DataTableTemplate
// vi.mock('@/modules/core/components', () => ({
//   DataTableTemplate: ({
//     errorMessage,
//     disabledDoubleClick,
//     table,
//     lengthColumns,
//     rowCount,
//     isLoading,
//   }: any) => (
//     <div data-testid="data-table-template">
//       <div data-testid="error-message">{errorMessage}</div>
//       <div data-testid="disabled-double-click">
//         {disabledDoubleClick.toString()}
//       </div>
//       <div data-testid="length-columns">{lengthColumns}</div>
//       <div data-testid="row-count">{rowCount}</div>
//       <div data-testid="is-loading">{isLoading.toString()}</div>
//     </div>
//   ),
// }));

vi.mock(import('@/modules/core/components'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    DataTableTemplate: ({
      errorMessage,
      disabledDoubleClick,
      table,
      lengthColumns,
      rowCount,
      isLoading,
    }: any) => (
      <div data-testid="data-table-template">
        <div data-testid="error-message">{errorMessage}</div>
        <div data-testid="disabled-double-click">
          {disabledDoubleClick.toString()}
        </div>
        <div data-testid="length-columns">{lengthColumns}</div>
        <div data-testid="row-count">{rowCount}</div>
        <div data-testid="is-loading">{isLoading.toString()}</div>
      </div>
    ),
  };
});

// Helper para renderizar con el provider
const renderWithProvider = (component: React.ReactNode) => {
  return render(<UsersModuleProvider>{component}</UsersModuleProvider>);
};

describe('UsersTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    // Reset mocks to default values
    mockQueryUsers.isLoading = false;
    mockQueryUsers.isRefetching = false;
    mockQueryUsers.data = {
      total_row_count: 10,
      records: [],
    };
    mockActionsUsersModule.find_all_users = true;
    mockActionsUsersModule.find_one_user = true;
    mockMutationDeleteUsers.isPending = false;
    mockMutationDeleteUser.isPending = false;
    mockDataTable.lengthColumns = 5;
  });

  //   it('should render correctly with default props', () => {
  //     renderWithProvider(<UsersTable />);

  //     expect(screen.getByTestId('data-table-template')).toBeInTheDocument();
  //     expect(screen.getByTestId('error-message')).toHaveTextContent(
  //       'No hay registros.'
  //     );
  //     expect(screen.getByTestId('disabled-double-click')).toHaveTextContent(
  //       'false'
  //     );
  //     expect(screen.getByTestId('length-columns')).toHaveTextContent('5');
  //     expect(screen.getByTestId('row-count')).toHaveTextContent('10');
  //     expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
  //   });

  it('should show permission error message when user has no find_all_users permission', () => {
    mockActionsUsersModule.find_all_users = false;

    renderWithProvider(<UsersTable />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'No tienes permiso para ver el listado de usuarios 😢'
    );
  });

  it('should disable double click when user has no find_one_user permission', () => {
    mockActionsUsersModule.find_one_user = false;

    renderWithProvider(<UsersTable />);

    expect(screen.getByTestId('disabled-double-click')).toHaveTextContent(
      'true'
    );
  });

  //   it('should show loading state when queryUsers is loading', () => {
  //     mockQueryUsers.isLoading = true;

  //     renderWithProvider(<UsersTable />);

  //     expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
  //   });

  //   it('should show loading state when queryUsers is refetching', () => {
  //     mockQueryUsers.isRefetching = true;

  //     renderWithProvider(<UsersTable />);

  //     expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
  //   });

  //   it('should show loading state when mutationDeleteUsers is pending', () => {
  //     mockMutationDeleteUsers.isPending = true;

  //     renderWithProvider(<UsersTable />);

  //     expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
  //   });

  //   it('should show loading state when mutationDeleteUser is pending', () => {
  //     mockMutationDeleteUser.isPending = true;

  //     renderWithProvider(<UsersTable />);

  //     expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
  //   });

  it('should handle undefined rowCount gracefully', () => {
    mockQueryUsers.data = undefined as any;

    renderWithProvider(<UsersTable />);

    expect(screen.getByTestId('row-count')).toHaveTextContent('0');
  });

  it('should pass the correct table object to DataTableTemplate', () => {
    renderWithProvider(<UsersTable />);

    expect(screen.getByTestId('data-table-template')).toBeInTheDocument();
  });

  it('should use correct lengthColumns from dataTable', () => {
    mockDataTable.lengthColumns = 8;

    renderWithProvider(<UsersTable />);

    expect(screen.getByTestId('length-columns')).toHaveTextContent('8');
  });
});
