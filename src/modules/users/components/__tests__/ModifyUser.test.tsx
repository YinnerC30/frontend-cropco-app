import { render } from '@/test-utils';
import { cleanup } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ModifyUser from '../ModifyUser';

const mockUsePutUser = vi.fn();
const mockUsePutMutate = vi.fn();
// const mockUseGetUser = vi.fn();

const mockUserData = {
  first_name: 'Ana',
  last_name: 'García',
  email: 'ana@email.com',
  cell_phone_number: 3147736549,
  actions: [
    {
      id: '6f76fad1-5c37-4cc5-b9a2-9c614a41cc77',
      createdDate: '2025-07-04T13:47:28.850Z',
      updatedDate: '2025-07-04T13:47:28.850Z',
      deletedDate: null,
    },
    {
      id: 'e2696cbf-a35c-42dd-9118-172516368369',
      createdDate: '2025-07-04T13:47:28.860Z',
      updatedDate: '2025-07-04T13:47:28.860Z',
      deletedDate: null,
    },
    {
      id: '5b4740b0-78fe-4302-b39c-d5c37c106cd6',
      createdDate: '2025-07-04T13:47:28.874Z',
      updatedDate: '2025-07-04T13:47:28.874Z',
      deletedDate: null,
    },
    {
      id: '17fe3c94-6feb-40d8-91ea-ebf8cc2a9e02',
      createdDate: '2025-07-04T13:47:28.887Z',
      updatedDate: '2025-07-04T13:47:28.887Z',
      deletedDate: null,
    },
  ],
};

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
      data: mockUserData,
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
    expect(
      result.getByDisplayValue(mockUserData.first_name)
    ).toBeInTheDocument();
    expect(
      result.getByDisplayValue(mockUserData.last_name)
    ).toBeInTheDocument();
    expect(result.getByDisplayValue(mockUserData.email)).toBeInTheDocument();
    expect(
      result.getByDisplayValue(mockUserData.cell_phone_number)
    ).toBeInTheDocument();
  });
});
