import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { UsersSearchBar } from '../UsersSearchBar';

// Mock the BasicSearchBar component
// vi.mock('@/modules/core/components', () => ({
//   BasicSearchBar: vi.fn(({ query, disabled }) => (
//     <div data-testid="basic-search-bar">
//       <span data-testid="query">{query}</span>
//       <span data-testid="disabled">{disabled ? 'disabled' : 'enabled'}</span>
//     </div>
//   )),
// }));

vi.mock(import('@/modules/core/components'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BasicSearchBar: vi.fn(({ query, disabled }) => (
      <div data-testid="basic-search-bar">
        <span data-testid="query">{query}</span>
        <span data-testid="disabled">{disabled ? 'disabled' : 'enabled'}</span>
      </div>
    )),
  };
});

// Mock the useUsersModuleContext hook
vi.mock('../../../hooks', () => ({
  useUsersModuleContext: vi.fn(),
}));

import { BasicSearchBar } from '@/modules/core/components';
import { useUsersModuleContext } from '../../../hooks';
import { render } from '@/test-utils';

const mockUseUsersModuleContext = useUsersModuleContext as MockedFunction<
  typeof useUsersModuleContext
>;
const mockBasicSearchBar = BasicSearchBar as MockedFunction<
  typeof BasicSearchBar
>;

describe('UsersSearchBar', () => {
  const mockContextBase = {
    queryUsers: {} as any,
    dataTable: {} as any,
    mutationDeleteUsers: {} as any,
    mutationDeleteUser: {} as any,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    // Arrange
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: 'test query',
      actionsUsersModule: { find_all_users: true },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(screen.getByTestId('users-search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('basic-search-bar')).toBeInTheDocument();
  });

  it('should pass correct props to BasicSearchBar when user has find_all_users permission', () => {
    // Arrange
    const mockQuery = 'search term';
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: mockQuery,
      actionsUsersModule: { find_all_users: true },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(mockBasicSearchBar).toHaveBeenCalledWith(
      {
        query: mockQuery,
        disabled: false,
      },
      expect.anything()
    );
    expect(screen.getByTestId('query')).toHaveTextContent(mockQuery);
    expect(screen.getByTestId('disabled')).toHaveTextContent('enabled');
  });

  it('should disable BasicSearchBar when user does not have find_all_users permission', () => {
    // Arrange
    const mockQuery = 'search term';
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: mockQuery,
      actionsUsersModule: { find_all_users: false },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(mockBasicSearchBar).toHaveBeenCalledWith(
      {
        query: mockQuery,
        disabled: true,
      },
      expect.anything()
    );
    expect(screen.getByTestId('query')).toHaveTextContent(mockQuery);
    expect(screen.getByTestId('disabled')).toHaveTextContent('disabled');
  });

  it('should disable BasicSearchBar when actionsUsersModule does not contain find_all_users', () => {
    // Arrange
    const mockQuery = 'search term';
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: mockQuery,
      actionsUsersModule: {},
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(mockBasicSearchBar).toHaveBeenCalledWith(
      {
        query: mockQuery,
        disabled: true,
      },
      expect.anything()
    );
    expect(screen.getByTestId('disabled')).toHaveTextContent('disabled');
  });

  it('should handle empty query', () => {
    // Arrange
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: '',
      actionsUsersModule: { find_all_users: true },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(mockBasicSearchBar).toHaveBeenCalledWith(
      {
        query: '',
        disabled: false,
      },
      expect.anything()
    );
    expect(screen.getByTestId('query')).toHaveTextContent('');
  });

  it('should handle undefined query', () => {
    // Arrange
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: undefined as any,
      actionsUsersModule: { find_all_users: true },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    expect(mockBasicSearchBar).toHaveBeenCalledWith(
      {
        query: undefined,
        disabled: false,
      },
      expect.anything()
    );
  });

  it('should have correct CSS classes', () => {
    // Arrange
    mockUseUsersModuleContext.mockReturnValue({
      ...mockContextBase,
      paramQuery: 'test',
      actionsUsersModule: { find_all_users: true },
    });

    // Act
    render(<UsersSearchBar />);

    // Assert
    const container = screen.getByTestId('users-search-bar');
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'w-full'
    );
  });
});
