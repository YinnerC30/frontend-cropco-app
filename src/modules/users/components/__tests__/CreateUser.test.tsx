import { render } from '@/test-utils';
import { cleanup } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateUser } from '../CreateUser';

const mockUsePostUser = vi.fn();
const mockUsePostMutate = vi.fn();
const mockUseGetAllModules = vi.fn().mockReturnValue({
  isLoading: false,
  data: [],
});

vi.mock('@/modules/users/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    usePostUser: () => mockUsePostUser(),
  };
});

vi.mock('@/modules/core/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useGetAllModules: () => mockUseGetAllModules(),
  };
});

// vi.mock('@tanstack/react-query', async (importOriginal) => {
//   const actual = (await importOriginal()) as any;
//   return {
//     ...actual,
//     useQueryClient: () => ({
//       invalidateQueries: vi.fn(),
//     }),
//     useMutation: ({ mutationFn, onSuccess, onError }: any) => ({
//       mutate: mockUsePostMutate,
//       isPending: false,
//       mutationFn,
//       onSuccess,
//       onError,
//     }),
//   };
// });

describe('CreateUser', () => {
  beforeEach(() => {
    // Configurar el mock por defecto antes de cada test
    mockUsePostUser.mockReturnValue({
      mutate: mockUsePostMutate,
      isPending: false,
    });

    mockUseGetAllModules.mockReturnValue({
      isLoading: false,
      data: [],
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renderiza el breadcrumb y el formulario correctamente', () => {
    const result = render(<CreateUser />);

    expect(
      result.getByRole('navigation', { name: /breadcrumb/i })
    ).toBeInTheDocument();

    expect(result.getByTestId('form-user')).toBeInTheDocument();
    expect(result.getByTestId('form-buttons')).toBeInTheDocument();
  });

  it('habilita el botón de submit cuando isPending es false', () => {
    mockUsePostUser.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    const result = render(<CreateUser />);
    const submitButton = result.getByTestId('form-submit-button');
    expect(submitButton).not.toBeDisabled();
  });
});
