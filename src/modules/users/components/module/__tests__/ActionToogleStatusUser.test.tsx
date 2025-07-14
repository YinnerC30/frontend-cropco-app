import { DataTableMenuActionsProvider } from '@/modules/core/components';
import { cleanup, fireEvent, render, screen } from '@/test-utils';
import { describe, it, vi } from 'vitest';
import { ActionToogleStatusUser } from '../ActionToogleStatusUser';

// Definición de los mocks
const mockMutate = vi.fn();
// const mockToggleOpen = vi.fn();

// const mockUseAuthContext = vi.fn().mockReturnValue({
//   user: {
//     id: 'user-1',
//   },
// });

// Mock simple de la mutación
// const mockMutation = {
//   mutate: mockMutate,
//   isPending: false,
//   isError: false,
//   isSuccess: false,
//   error: null,
//   data: undefined,
//   reset: vi.fn(),
//   mutateAsync: vi.fn(),
//   variables: undefined,
//   context: undefined,
//   failureCount: 0,
//   failureReason: null,
//   isIdle: true,
//   isPaused: false,
//   status: 'idle' as const,
//   submittedAt: 0,
//   setData: vi.fn(),
//   setError: vi.fn(),
//   setVariables: vi.fn(),
//   getMeta: vi.fn(),
//   getContext: vi.fn(),
//   getData: vi.fn(),
//   getError: vi.fn(),
//   getFailureCount: vi.fn(),
//   getFailureReason: vi.fn(),
//   getIsError: vi.fn(),
//   getIsIdle: vi.fn(),
//   getIsLoading: vi.fn(),
//   getIsPaused: vi.fn(),
//   getIsPending: vi.fn(),
//   getIsSuccess: vi.fn(),
//   getStatus: vi.fn(),
//   getSubmittedAt: vi.fn(),
//   getVariables: vi.fn(),
// };

// const defaultProps = {
//   id: 'user-1',
//   status: true,
//   disabled: false,
// };

const mockToast = vi.fn();

// Mock de sonner
vi.mock('sonner', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    toast: () => mockToast(),
  };
});

// // Mock de useAuthContext
// vi.mock('@/auth', () => ({
//   useAuthContext: vi.fn(),
// }));

vi.mock(import('@/auth'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuthContext: vi.fn().mockReturnValue({
      user: {
        id: 'user-1',
      },
    }),
  };
});

// Mock de usePutUserStatus
vi.mock('../../hooks/mutations/usePutUserStatus', () => ({
  usePutUserStatus: vi.fn(),
}));

let isPendingMutation = false;

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
    }),
    useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
      mutate: mockMutate,
      isPending: isPendingMutation,
      mutationFn,
      onSuccess,
      onError,
    }),
    //   useQuery: (id: string) => ({
    //     data: mockUserData,
    //     isLoading: isLoadingData,
    //     isError: false,
    //     error: null,
    //     isSuccess: true,
    //     isFetching: false,
    //     isRefetching: false,
    //     status: 'success',
    //   }),
  };
});

describe('ActionToogleStatusUser', () => {
  //   beforeEach(() => {
  //     vi.clearAllMocks();

  //     // Configurar mocks por defecto
  //     // require('@/auth').useAuthContext.mockReturnValue({
  //     //   user: { id: 'user-1' },
  //     // });

  //     // require('../../hooks/mutations/usePutUserStatus').usePutUserStatus.mockReturnValue(
  //     //   mockMutation
  //     // );

  //     // require('sonner').toast.mockImplementation(vi.fn());
  //   });

  afterEach(() => {
    //   vi.clearAllMocks();
    cleanup();
  });

  it('debe renderizar el botón "Desactivar" si el usuario está activo', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionToogleStatusUser id="user-2" status={true} />
      </DataTableMenuActionsProvider>
    );

    // El botón está dentro del DropdownMenuItem, necesitamos abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Desactivar')).toBeInTheDocument();
  });

  it('debe renderizar el botón "Activar" si el usuario está inactivo', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionToogleStatusUser id="user-2" status={false} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Activar')).toBeInTheDocument();
  });

  it('debe llamar a mutate directamente si el usuario actual NO es el mismo', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionToogleStatusUser id="otro-usuario" status={true} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón de acción
    fireEvent.click(screen.getByText('Desactivar'));

    expect(mockMutate).toHaveBeenCalledWith('otro-usuario', expect.any(Object));
  });

  it('debe mostrar un toast si el usuario actual es el mismo', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionToogleStatusUser id="user-1" status={true} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    // Hacer click en el botón de acción
    fireEvent.click(screen.getByText('Desactivar'));

    expect(mockToast).toHaveBeenCalled();

    // expect(mockToast).toHaveBeenCalledWith(
    //   'Se cerrara la sesión',
    //   expect.objectContaining({
    //     description: expect.any(String),
    //     action: expect.objectContaining({
    //       label: 'Desactivar',
    //       onClick: expect.any(Function),
    //     }),
    //     duration: 3000,
    //   })
    // );
  });

  it('debe deshabilitar el botón si disabled es true', () => {
    render(
      <DataTableMenuActionsProvider>
        <ActionToogleStatusUser id="user-2" status={true} disabled={true} />
      </DataTableMenuActionsProvider>
    );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Desactivar')).toBeDisabled();
  });

  it('debe deshabilitar el botón si isPending es true', () => {
    // const mutationWithPending = {
    //   ...mockMutation,
    //   isPending: true,
    // };

    // require('../../hooks/mutations/usePutUserStatus').usePutUserStatus.mockReturnValue(
    //   mutationWithPending
    // );

    (isPendingMutation = true),
      render(
        <DataTableMenuActionsProvider>
          <ActionToogleStatusUser id="user-2" status={true} />
        </DataTableMenuActionsProvider>
      );

    // Abrir el menú primero
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Desactivar')).toBeDisabled();
  });

  // it('debe llamar a mutate y cerrar el menú al hacer click en "Desactivar" del toast', () => {
  //   render(
  //     <DataTableMenuActionsProvider>
  //       <ActionToogleStatusUser id="user-1" status={true} />
  //     </DataTableMenuActionsProvider>
  //   );

  //   // Abrir el menú primero
  //   const menuButton = screen.getByRole('button', { name: /abrir menu/i });
  //   fireEvent.click(menuButton);

  //   // Hacer click en el botón de acción para mostrar el toast
  //   fireEvent.click(screen.getByText('Desactivar'));

  //   // Simula el click en el botón "Desactivar" del toast
  //   const toastMock = require('sonner').toast;
  //   const lastCall = toastMock.mock.calls[toastMock.mock.calls.length - 1];
  //   const action = lastCall[1].action;
  //   action.onClick();

  //   expect(mockMutate).toHaveBeenCalledWith('user-1', expect.any(Object));
  // });

  //   it('debe cerrar el menú después de una acción exitosa', () => {
  //     // Mock de toggleOpen para verificar que se llama
  //     const mockToggleOpen = vi.fn();

  //     // Mock del contexto del menú
  //     vi.mocked(
  //       require('@/modules/core/components').useDataTableMenuActionsContext
  //     ).mockReturnValue({
  //       toggleOpen: mockToggleOpen,
  //     });

  //     render(
  //       <DataTableMenuActionsProvider>
  //         <ActionToogleStatusUser id="otro-usuario" status={true} />
  //       </DataTableMenuActionsProvider>
  //     );

  //     // Abrir el menú primero
  //     const menuButton = screen.getByRole('button', { name: /abrir menu/i });
  //     fireEvent.click(menuButton);

  //     // Hacer click en el botón de acción
  //     fireEvent.click(screen.getByText('Desactivar'));

  //     // Simular que la mutación se ejecuta con éxito
  //     const lastCall = mockMutate.mock.calls[mockMutate.mock.calls.length - 1];
  //     const onSuccessCallback = lastCall[1].onSuccess;
  //     onSuccessCallback();

  //     expect(mockToggleOpen).toHaveBeenCalledWith(false);
  //   });
});
