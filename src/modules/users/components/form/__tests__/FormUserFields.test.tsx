import { render } from '@/test-utils';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formFieldsUser } from '@/modules/users/utils';
import { FormUserFields } from '../FormUserFields';

const mockOnSubmit = vi.fn();
const mockForm = vi.fn().mockReturnValue({
  handleSubmit: vi.fn((callback) => (e: any) => {
    e && e.preventDefault();
    callback();
  }),
  watch: vi.fn(),
  getValues: vi.fn(),
  getFieldState: vi.fn(),
  setError: vi.fn(),
  clearErrors: vi.fn(),
  setValue: vi.fn(),
  trigger: vi.fn(),
  formState: {
    errors: {},
    isDirty: false,
    isSubmitting: false,
    isValid: true,
    isValidating: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    defaultValues: {},
  },
  resetField: vi.fn(),
  reset: vi.fn(),
  unregister: vi.fn(),
  register: vi.fn(),
  setFocus: vi.fn(),
  control: {
    register: vi.fn(),
    unregister: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(),
    trigger: vi.fn(),
  },
});

const mockUseFormUserContext = vi.fn().mockReturnValue({
  form: mockForm(),
  onSubmit: mockOnSubmit,
  readOnly: false,
  hiddenPassword: true,
  userHasAction: vi.fn(),
  handleInselectAllActions: vi.fn(),
  handleInselectAllActionsInModule: vi.fn(),
  handleSelectAllActionInModule: vi.fn(),
  handleSelectAllActions: vi.fn(),
  updateActionsUserForm: vi.fn(),
  isSubmitting: false,
  queryModules: {
    data: [],
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true,
    isFetching: false,
    isRefetching: false,
    refetch: vi.fn(),
  },
  isSelectedAllActions: false,
  setIsSelectedAllActions: vi.fn(),
  IsSelectedAllActionsInModule: vi.fn(),
});

vi.mock(import('@/components'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    FormField: ({ children, name }: any) => {
      // Verificar si children es una función (render prop)
      //   if (typeof children === 'function') {
      //     return children({
      //       field: { name, value: '', onChange: vi.fn(), onBlur: vi.fn() },
      //     });
      //   }
      // Si no es una función, renderizar children normalmente
      return children;
    },
    // your mocked methods
  };
});

vi.mock('@/modules/core/components', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    FormFieldInput: ({ label, description, disabled, ...rest }: any) => (
      <div>
        <label>{label}</label>
        <input disabled={disabled} {...rest} />
        <p>{description}</p>
      </div>
    ),
  };
});

vi.mock('@/modules/users/hooks', () => {
  return {
    useFormUserContext: () => mockUseFormUserContext(),
  };
});

describe('FormUserFields', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar los campos de datos personales', () => {
    const { getByText } = render(<FormUserFields />);
    expect(getByText(formFieldsUser.first_name.label)).toBeInTheDocument();
    expect(getByText(formFieldsUser.last_name.label)).toBeInTheDocument();
    expect(getByText(formFieldsUser.email.label)).toBeInTheDocument();
    expect(
      getByText(formFieldsUser.cell_phone_number.label)
    ).toBeInTheDocument();
  });

//   it.only('debe renderizar los campos de contraseña si hiddenPassword es false', () => {
//     const { getByText } = render(<FormUserFields />);
//     // TODO: Hacer un custom component para el input tipo password.
//     // TOdO: Hacer mock de dicho componente y luego hacer pruebas
//     expect(getByText(formFieldsUser.password1.label)).toBeInTheDocument();
//     expect(getByText(formFieldsUser.password2.label)).toBeInTheDocument();
//   });

  //   it('no debe renderizar los campos de contraseña si hiddenPassword es true', () => {
  //     vi.mocked(require('../../hooks').useFormUserContext).mockReturnValue({
  //       ...defaultContext,
  //       hiddenPassword: true,
  //     });
  //     const { queryByLabelText } = render(<FormUserFields />);
  //     expect(queryByLabelText(formFieldsUser.password1.label)).toBeNull();
  //     expect(queryByLabelText(formFieldsUser.password2.label)).toBeNull();
  //   });

  //   it('debe deshabilitar los campos si readOnly es true', () => {
  //     vi.mocked(require('../../hooks').useFormUserContext).mockReturnValue({
  //       ...defaultContext,
  //       readOnly: true,
  //     });
  //     const { getByLabelText } = render(<FormUserFields />);
  //     expect(getByLabelText(formFieldsUser.first_name.label)).toBeDisabled();
  //     expect(getByLabelText(formFieldsUser.last_name.label)).toBeDisabled();
  //     expect(getByLabelText(formFieldsUser.email.label)).toBeDisabled();
  //     expect(
  //       getByLabelText(formFieldsUser.cell_phone_number.label)
  //     ).toBeDisabled();
  //     expect(getByLabelText(formFieldsUser.password1.label)).toHaveAttribute(
  //       'readonly'
  //     );
  //     expect(getByLabelText(formFieldsUser.password2.label)).toHaveAttribute(
  //       'readonly'
  //     );
  //   });

  //   it('debe alternar la visibilidad de la contraseña al hacer clic en el botón', () => {
  //     const { getAllByRole, getByLabelText } = render(<FormUserFields />);
  //     const buttons = getAllByRole('button');
  //     const passwordInput = getByLabelText(formFieldsUser.password1.label);
  //     // Por defecto debe ser tipo password
  //     expect(passwordInput).toHaveAttribute('type', 'password');
  //     // Click para mostrar
  //     fireEvent.click(buttons[0]);
  //     // Ahora debe ser tipo text
  //     expect(passwordInput).toHaveAttribute('type', 'text');
  //     // Click para ocultar
  //     fireEvent.click(buttons[0]);
  //     expect(passwordInput).toHaveAttribute('type', 'password');
  //   });

  //   it('debe llamar a onSubmit al enviar el formulario', () => {
  //     const { container } = render(<FormUserFields />);
  //     const form = container.querySelector('form');
  //     fireEvent.submit(form!);
  //     expect(mockOnSubmit).toHaveBeenCalled();
  //   });
});
