import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@/test-utils';
import { HomeLayout } from '../HomeLayout';

// Mocks de hooks y componentes
const mockUseAuthContext = vi.fn();
const mockUseCheckAuthStatus = vi.fn();
const mockUseRenewToken = vi.fn();
const mockUseFormChange = vi.hoisted(() =>
  vi.fn(() => ({
    hasUnsavedChanges: false,
  }))
);

vi.mock('@/auth/hooks', () => ({
  useAuthContext: () => mockUseAuthContext(),
  useCheckAuthStatus: () => mockUseCheckAuthStatus(),
  useRenewToken: () => mockUseRenewToken(),
}));

vi.mock('@/auth/hooks/mutations/useLogoutUser', () => ({
  useLogoutUser: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useLocation: vi.fn(() => ({ pathname: '/' })),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock('@/routes/components/RoutesNavBar', () => ({
  routes: [],
}));

vi.mock('../../ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button data-testid="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('../../ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu-content">{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick, ...props }: any) => (
    <div data-testid="dropdown-menu-item" onClick={onClick} {...props}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ children, ...props }: any) => (
    <div data-testid="dropdown-menu-trigger" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@/modules/core/hooks/useDocumentTitle', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('@/modules/core/hooks/useToastDiscardChanges', () => ({
  useToastDiscardChanges: vi.fn(() => ({
    showToast: vi.fn(),
  })),
}));

vi.mock('../hooks/useHome', () => ({
  useHome: vi.fn(() => ({
    nameModulesUser: [],
  })),
}));

vi.mock('../../ui/sidebar', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-provider">{children}</div>
  ),
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-footer">{children}</div>
  ),
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-label">{children}</div>
  ),
  SidebarHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-header">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu">{children}</div>
  ),
  SidebarMenuButton: ({ children, onClick, ...props }: any) => (
    <button data-testid="sidebar-menu-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  SidebarMenuItem: ({ children, ...props }: any) => (
    <div data-testid="sidebar-menu-item" {...props}>
      {children}
    </div>
  ),
  useSidebar: vi.fn(() => ({
    setOpenMobile: vi.fn(),
    isMobile: false,
  })),
}));

vi.mock('../MyAccount', () => ({
  MyAccount: () => <div data-testid="my-account" />,
}));

vi.mock('../AppSideBar', () => ({
  AppSidebar: () => <nav data-testid="app-sidebar" />,
}));

vi.mock('../MainContent', () => ({
  MainContent: () => <main data-testid="main-content" />,
}));

vi.mock('@/modules/core/components/shared/CommandDialogApp', () => ({
  CommandDialogApp: () => <div data-testid="command-dialog-app" />,
}));

vi.mock('@/modules/core/components', () => ({
  Loading: () => <div data-testid="loading" />,
  useFormChange: mockUseFormChange,
  useTheme: vi.fn(() => ({
    setTheme: vi.fn(),
  })),
}));

describe('HomeLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el loading mientras se verifica el estado de autenticación', () => {
    mockUseAuthContext.mockReturnValue({ is_login: false });
    mockUseCheckAuthStatus.mockReturnValue({ isLoading: true });

    render(<HomeLayout />, { withFormChange: false });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('redirecciona al login si el usuario no está autenticado', () => {
    mockUseAuthContext.mockReturnValue({ is_login: false });
    mockUseCheckAuthStatus.mockReturnValue({ isLoading: false });

    render(<HomeLayout />, { withFormChange: false });

    // El componente Navigate no renderiza nada visible, pero podemos verificar que no se renderiza el layout principal
    expect(screen.queryByTestId('sidebar-provider')).not.toBeInTheDocument();
    expect(screen.queryByTestId('main-content')).not.toBeInTheDocument();
  });

  it('renderiza el layout principal si el usuario está autenticado y no está cargando', async () => {
    mockUseAuthContext.mockReturnValue({ is_login: true });
    mockUseCheckAuthStatus.mockReturnValue({ isLoading: false });

    render(<HomeLayout />, { withFormChange: false });

    // Esperar a que se rendericen los elementos principales
    await waitFor(() => {
      expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
      expect(screen.getByTestId('command-dialog-app')).toBeInTheDocument();
      expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
    });
  });
});
