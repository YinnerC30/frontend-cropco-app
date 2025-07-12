import { render } from '@/test-utils';
import { cleanup } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ModifyUser from '../ModifyUser';

const mockUsePutUser = vi.fn();
const mockUsePutMutate = vi.fn();
// const mockUseGetUser = vi.fn();
const mockUseGetAllModules = vi.fn().mockReturnValue({
  isLoading: false,
  data: [],
});

let isSubmittingForm = false;
let isLoadingData = false;

// vi.mock('@/modules/users/hooks', async (importOriginal) => {
//   const actual = (await importOriginal()) as any;
//   return {
//     ...actual,
//     usePutUser: () => mockUsePutUser(),
//     // useGetUser: (id: string) => mockUseGetUser(),
//     // useGetUser: (id: string) => ({
//     //   data: { first_name: 'Ana', last_name: 'García', email: 'ana@email.com' },
//     //   isLoading: false,
//     // }),
//   };
// });

vi.mock('@/modules/core/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useGetAllModules: () => mockUseGetAllModules(),
  };
});

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
    }),
    useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
      mutate: mockUsePutMutate,
      isPending: isSubmittingForm,
      mutationFn,
      onSuccess,
      onError,
    }),
    useQuery: (id: string) => ({
      data: { first_name: 'Ana', last_name: 'García', email: 'ana@email.com' },
      isLoading: isLoadingData,
      isError: false,
      error: null,
      isSuccess: true,
      isFetching: false,
      isRefetching: false,
      status: 'success',
    }),
  };
});

describe('ModifyUser', () => {
  beforeEach(() => {
    // Configurar el mock por defecto antes de cada test
    mockUsePutUser.mockReturnValue({
      mutate: mockUsePutMutate,
      isPending: false,
    });

    mockUseGetAllModules.mockReturnValue({
      isLoading: false,
      data: [],
    });

    isSubmittingForm = false;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renderiza el breadcrumb y el formulario correctamente', () => {
    const result = render(<ModifyUser />);

    expect(
      result.getByRole('navigation', { name: /breadcrumb/i })
    ).toBeInTheDocument();

    expect(result.getByTestId('form-user')).toBeInTheDocument();
    expect(result.getByTestId('form-buttons')).toBeInTheDocument();
  });

  it('habilita el botón de submit cuando isPending es false', () => {
    mockUsePutUser.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    const result = render(<ModifyUser />);
    const submitButton = result.getByTestId('form-submit-button');
    expect(submitButton).not.toBeDisabled();
  });

  it('deshabilita el botón de submit cuando isPending es true', () => {
    isSubmittingForm = true;

    const result = render(<ModifyUser />);
    const submitButton = result.getByTestId('form-submit-button');
    expect(submitButton).toBeDisabled();
  });

  it('pasa los valores por defecto correctos al formulario', () => {
    const result = render(<ModifyUser />);

    // Verifica que los campos del formulario estén presentes con los valores correctos
    expect(result.getByDisplayValue('Ana')).toBeInTheDocument();
    expect(result.getByDisplayValue('García')).toBeInTheDocument();
    expect(result.getByDisplayValue('ana@email.com')).toBeInTheDocument();
    // expect(result.getByDisplayValue('987654321')).toBeInTheDocument();
  });
});
