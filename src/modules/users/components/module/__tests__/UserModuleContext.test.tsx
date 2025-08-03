import { screen } from '@testing-library/react';
import { useContext } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersModuleContext, UsersModuleProvider } from '../UsersModuleContext';
import { render } from '@/test-utils';

// Mock hooks and dependencies
vi.mock('@/auth/hooks', () => ({
  useAuthContext: () => ({
    getActionsModule: vi.fn(() => ['create', 'edit', 'delete']),
  }),
}));

vi.mock('@/modules/core/hooks/', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useBasicQueryData: vi.fn(() => ({ value: 'test' })),
    useDataTableManual: vi.fn(() => ({
      rows: [],
      pagination: { pageIndex: 0, pageSize: 10 },
      setPagination: vi.fn(),
    })),
  };
});

vi.mock('@/modules/core/hooks/data-table/useCreateColumnsTable', () => ({
  useCreateColumnsTable: vi.fn(() => []),
}));

vi.mock('../../hooks', () => ({
  useGetAllUsers: vi.fn(() => ({
    query: {
      isSuccess: true,
      data: { total_page_count: 2, current_row_count: 5, records: [{ id: 1 }] },
    },
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: vi.fn(),
  })),
  useDeleteBulkUsers: vi.fn(() => ({ mutate: vi.fn() })),
  useDeleteUser: vi.fn(() => ({ mutate: vi.fn() })),
}));

vi.mock('./columnsTableUsers', () => ({
  columnsTableUsers: [],
}));
vi.mock('./UsersModuleActionsTable', () => ({
  UsersModuleActionsTable: [],
}));

// Helper component to consume context
const Consumer = () => {
  const context: any = useContext(UsersModuleContext);
  if (!context) return <div>No context</div>;
  return (
    <div>
      <span data-testid="value">{context.value}</span>
      <span data-testid="actions">{context.actionsUsersModule.join(',')}</span>
      <span data-testid="paramQuery">{context.paramQuery}</span>
      <span data-testid="rowCount">{context.dataTable.rows.length}</span>
    </div>
  );
};

describe('UsersModuleContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide context values to children', () => {
    render(
      <UsersModuleProvider>
        <Consumer />
      </UsersModuleProvider>
    );
    expect(screen.getByTestId('value')).toHaveTextContent('test');
    expect(screen.getByTestId('actions')).toHaveTextContent(
      'create,edit,delete'
    );
    expect(screen.getByTestId('paramQuery')).toHaveTextContent('test');
  });

  it('should render children', () => {
    render(
      <UsersModuleProvider>
        <div data-testid="child">Child</div>
      </UsersModuleProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
