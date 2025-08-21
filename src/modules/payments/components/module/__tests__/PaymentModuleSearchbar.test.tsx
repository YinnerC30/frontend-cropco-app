import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentModuleSearchbar } from '../PaymentModuleSearchbar';
import { PaymentsModuleProvider } from '../PaymentModuleContext';
import { BrowserRouter } from 'react-router-dom';

// Mock del contexto de autenticación
vi.mock('@/auth', () => ({
  useAuthContext: () => ({
    getActionsModule: vi.fn(() => ({
      find_all_payments: true,
    })),
  }),
}));

// Mock de las queries
const mockQueryEmployees = {
  data: {
    records: [
      { id: '1', full_name: 'Juan Pérez' },
      { id: '2', full_name: 'María García' },
    ],
  },
  isSuccess: true,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
};

const mockQueryPayments = {
  data: {
    records: [],
    total_page_count: 0,
    total_row_count: 0,
  },
  isSuccess: true,
};

const mockContextValue = {
  paramsQuery: {
    employee: { id: '' },
    filter_by_date: {
      type_filter_date: undefined,
      date: undefined,
    },
    filter_by_value_pay: {
      type_filter_value_pay: undefined,
      value_pay: 0,
    },
    filter_by_method_of_payment: {
      method_of_payment: undefined,
    },
  },
  queryPayments: mockQueryPayments,
  dataTable: {
    columns: [],
    rows: [],
    pagination: { pageIndex: 0, pageSize: 10 },
    setPagination: vi.fn(),
  },
  mutationDeletePayments: {
    mutate: vi.fn(),
    isLoading: false,
  },
  mutationDeletePayment: {
    mutate: vi.fn(),
    isLoading: false,
  },
  actionsPaymentsModule: {
    find_all_payments: true,
  },
  appliedFilters: [],
  setAppliedFilters: vi.fn(),
  hasParamsQuery: false,
  queryGetDocument: {
    data: null,
    isLoading: false,
  },
  paymentIdDocument: '',
  setPaymentIdDocument: vi.fn(),
  setExecuteQuery: vi.fn(),
  queryEmployees: mockQueryEmployees,
};

// Mock del contexto
vi.mock('../../hooks/context/usePaymentModuleContext', () => ({
  usePaymentModuleContext: () => mockContextValue,
}));

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <PaymentsModuleProvider>{component}</PaymentsModuleProvider>
    </BrowserRouter>
  );
};

describe('PaymentModuleSearchbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    renderWithProviders(<PaymentModuleSearchbar />);

    // Verificar que el botón de filtros esté presente
    expect(screen.getByTestId('btn-payments-filters')).toBeInTheDocument();
  });

  it('should open dropdown menu when filter button is clicked', () => {
    renderWithProviders(<PaymentModuleSearchbar />);

    const filterButton = screen.getByTestId('btn-payments-filters');
    fireEvent.click(filterButton);

    // Verificar que el menú desplegable esté abierto
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should display employee filter component', () => {
    renderWithProviders(<PaymentModuleSearchbar />);

    // Verificar que el componente de filtro de empleados esté presente
    expect(
      screen.getByPlaceholderText('Selecciona un empleado')
    ).toBeInTheDocument();
  });

  it('should handle filter removal', () => {
    const mockSetAppliedFilters = vi.fn();
    const mockContextWithFilters = {
      ...mockContextValue,
      appliedFilters: [{ key: 'employee', label: 'Empleado: Juan Pérez' }],
      setAppliedFilters: mockSetAppliedFilters,
    };

    vi.mocked(
      require('../../hooks/context/usePaymentModuleContext')
        .usePaymentModuleContext
    ).mockReturnValue(mockContextWithFilters);

    renderWithProviders(<PaymentModuleSearchbar />);

    // Verificar que el filtro aplicado esté visible
    expect(screen.getByText('Empleado: Juan Pérez')).toBeInTheDocument();
  });

  it('should be disabled when user does not have permissions', () => {
    const mockContextWithoutPermissions = {
      ...mockContextValue,
      actionsPaymentsModule: {
        find_all_payments: false,
      },
    };

    vi.mocked(
      require('../../hooks/context/usePaymentModuleContext')
        .usePaymentModuleContext
    ).mockReturnValue(mockContextWithoutPermissions);

    renderWithProviders(<PaymentModuleSearchbar />);

    // Verificar que el botón esté deshabilitado
    expect(screen.getByTestId('btn-payments-filters')).toBeDisabled();
  });
});
