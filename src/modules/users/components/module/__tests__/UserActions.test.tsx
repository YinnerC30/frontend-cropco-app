import { cleanup, fireEvent, render, screen } from '@/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersActions } from '../UsersActions';
import { UsersModuleProvider } from '../UsersModuleContext';

// const mockMutate = vi.fn();

const mockUseUsersModuleContext = vi.fn().mockReturnValue({
  paramQuery: '',
  queryUsers: {
    refetch: vi.fn(),
    isSuccess: true,
    data: {
      records: [],
      total_page_count: 0,
      current_row_count: 0,
    },
  },
  dataTable: {
    getIdsToRowsSelected: () => ['1', '2'],
    resetSelectionRows: vi.fn(),
    hasSelectedRecords: false,
  },
  mutationDeleteUsers: {
    mutate: vi.fn(),
    isPending: false,
  },
  mutationDeleteUser: {
    mutate: vi.fn(),
    isPending: false,
  },
  actionsUsersModule: {
    find_all_users: true,
    remove_bulk_users: true,
    create_user: true,
  },
});

// Configurar todos los mocks antes de los tests
vi.mock('@/modules/users/hooks', () => ({
  useGetAllUsers: vi.fn().mockReturnValue({
    query: {
      refetch: vi.fn(),
      isSuccess: true,
      data: {
        records: [],
        total_page_count: 0,
        current_row_count: 0,
      },
    },
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: vi.fn(),
  }),
  useDeleteBulkUsers: vi.fn().mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  }),
  useDeleteUser: vi.fn().mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  }),
  useUsersModuleContext: () => mockUseUsersModuleContext(),
}));

vi.mock('@/modules/core/hooks', () => ({
  useDataTableManual: vi.fn().mockReturnValue({
    getIdsToRowsSelected: () => ['1', '2'],
    resetSelectionRows: vi.fn(),
    hasSelectedRecords: false,
  }),
  useBasicQueryData: vi.fn().mockReturnValue({
    value: '',
  }),
  useCreateColumnsTable: vi.fn().mockReturnValue([]),
  useGetAllModules: vi.fn().mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: true,
    isFetching: false,
    isRefetching: false,
    status: 'success',
    refetch: vi.fn(),
  }),
}));

vi.mock('@/auth/hooks', () => ({
  useAuthContext: vi.fn().mockReturnValue({
    getActionsModule: vi.fn().mockReturnValue({
      find_all_users: true,
      remove_bulk_users: true,
      create_user: true,
    }),
  }),
}));

// vi.mock('@tanstack/react-query', async (importOriginal) => {
//   const actual = (await importOriginal()) as any;
//   return {
//     ...actual,
//     useQueryClient: () => ({
//       invalidateQueries: vi.fn(),
//     }),
//     useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
//       mutate: mockMutate,
//       isPending: false,
//       mutationFn,
//       onSuccess,
//       onError,
//     }),
//   };
// });

describe('UsersActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('debe renderizar todos los botones principales', () => {
    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    expect(getByTestId('btn-refetch-data')).toBeInTheDocument();
    expect(getByTestId('btn-clear-selection-table')).toBeInTheDocument();
    expect(getByTestId('btn-delete-bulk')).toBeInTheDocument();
    expect(getByTestId('btn-create-record')).toBeInTheDocument();
  });

  it('debe llamar a refetch al hacer click en el botón de actualizar', async () => {
    const mockRefetch = vi.fn();
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: mockRefetch,
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: false,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-refetch-data');
    fireEvent.click(btn);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it('debe llamar a resetSelectionRows al hacer click en limpiar selección', () => {
    const mockResetSelectionRows = vi.fn();

    // Configurar que hay registros seleccionados
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: mockResetSelectionRows,
        hasSelectedRecords: true,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-clear-selection-table');
    fireEvent.click(btn);

    expect(mockResetSelectionRows).toHaveBeenCalled();
  });

  it('debe llamar a mutate al hacer click en eliminar', () => {
    const mockDeleteMutation = vi.fn();
    // Configurar que hay registros seleccionados
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: true,
      },
      mutationDeleteUsers: {
        mutate: mockDeleteMutation,
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-delete-bulk');
    fireEvent.click(btn);

    const btnContinue = getByTestId('btn-continue-delete');
    fireEvent.click(btnContinue);

    expect(mockDeleteMutation).toHaveBeenCalled();
    expect(mockDeleteMutation).toHaveBeenCalledWith(
      { userIds: ['1', '2'] },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it('debe deshabilitar el botón de actualizar si no tiene permiso', () => {
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: false,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: false,
        remove_bulk_users: true,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-refetch-data');
    expect(btn).toBeDisabled();
  });

  it('debe deshabilitar el botón de eliminar si no tiene permiso', () => {
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: true,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: false,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-delete-bulk');
    expect(btn).toBeDisabled();
  });

  it('debe deshabilitar el botón de eliminar si está pendiente', () => {
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: true,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: true,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: true,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-delete-bulk');
    expect(btn).toBeDisabled();
  });

  it('debe deshabilitar el botón de crear si no tiene permiso', () => {
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: false,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: false,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    const btn = getByTestId('btn-create-record');
    expect(btn).toBeDisabled();
  });

  it('no debe mostrar los botones de limpiar selección y eliminar si no hay selección', () => {
    mockUseUsersModuleContext.mockReturnValue({
      paramQuery: '',
      queryUsers: {
        refetch: vi.fn(),
        isSuccess: true,
        data: {
          records: [],
          total_page_count: 0,
          current_row_count: 0,
        },
      },
      dataTable: {
        getIdsToRowsSelected: () => ['1', '2'],
        resetSelectionRows: vi.fn(),
        hasSelectedRecords: false,
      },
      mutationDeleteUsers: {
        mutate: vi.fn(),
        isPending: false,
      },
      mutationDeleteUser: {
        mutate: vi.fn(),
        isPending: false,
      },
      actionsUsersModule: {
        find_all_users: true,
        remove_bulk_users: true,
        create_user: false,
      },
    });

    const { getByTestId } = render(
      <UsersModuleProvider>
        <UsersActions />
      </UsersModuleProvider>
    );

    expect(getByTestId('btn-clear-selection-table')).toBeDisabled();
    expect(getByTestId('btn-delete-bulk')).toBeDisabled();
  });
});
