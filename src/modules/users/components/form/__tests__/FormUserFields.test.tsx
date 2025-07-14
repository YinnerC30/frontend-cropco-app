import { render } from '@/test-utils';
import { cleanup, fireEvent } from '@testing-library/react';
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

const dataMockUseForm = {
  form: mockForm(),
  onSubmit: mockOnSubmit,
  readOnly: false,
  hiddenPassword: false,
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
};

const mockUseFormUserContext = vi.fn().mockReturnValue({
  ...dataMockUseForm,
});

vi.mock(import('@/components'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    FormField: ({ render }: any) => {
      return <>{render(() => {})}</>;
    },
  };
});

vi.mock('@/modules/core/components', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    FormFieldInput: ({ label, description, disabled, ...rest }: any) => {
      return (
        <div>
          <label>{label}</label>
          <input readOnly={disabled} {...rest} />
          <p>{description}</p>
        </div>
      );
    },
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
    expect(getByText(formFieldsUser.password1.label)).toBeInTheDocument();
    expect(getByText(formFieldsUser.password2.label)).toBeInTheDocument();
  });

  it('debe renderizar los campos de contraseña si hiddenPassword es false', () => {
    const { getByText } = render(<FormUserFields />);
    expect(getByText(formFieldsUser.password1.label)).toBeInTheDocument();
    expect(getByText(formFieldsUser.password2.label)).toBeInTheDocument();
  });

  it('no debe renderizar los campos de contraseña si hiddenPassword es true', () => {
    mockUseFormUserContext.mockReturnValue({
      ...dataMockUseForm,
      hiddenPassword: true,
    });

    const { queryByLabelText } = render(<FormUserFields />);
    expect(queryByLabelText(formFieldsUser.password1.label)).toBeNull();
    expect(queryByLabelText(formFieldsUser.password2.label)).toBeNull();
  });

  it('debe deshabilitar los campos si readOnly es true', () => {
    mockUseFormUserContext.mockReturnValue({
      ...dataMockUseForm,
      readOnly: true,
    });

    const { getByPlaceholderText, getByLabelText } = render(<FormUserFields />);

    const inputFirstName = getByPlaceholderText(
      formFieldsUser.first_name.placeholder
    );
    expect(inputFirstName).toHaveAttribute('readonly');

    const inputLastName = getByPlaceholderText(
      formFieldsUser.last_name.placeholder
    );
    expect(inputLastName).toHaveAttribute('readonly');

    const inputEmail = getByPlaceholderText(formFieldsUser.email.placeholder);
    expect(inputEmail).toHaveAttribute('readonly');

    const inputCellPhone = getByPlaceholderText(
      formFieldsUser.cell_phone_number.placeholder
    );
    expect(inputCellPhone).toHaveAttribute('readonly');

    expect(getByLabelText(formFieldsUser.password1.label)).toHaveAttribute(
      'readonly'
    );
    expect(getByLabelText(formFieldsUser.password2.label)).toHaveAttribute(
      'readonly'
    );
  });

  it('debe alternar la visibilidad de la contraseña al hacer clic en el botón', () => {
    const { getAllByRole, getByLabelText } = render(<FormUserFields />);
    const buttons = getAllByRole('button');
    const passwordInput = getByLabelText(formFieldsUser.password1.label);
    // Por defecto debe ser tipo password
    expect(passwordInput).toHaveAttribute('type', 'password');
    // Click para mostrar
    fireEvent.click(buttons[0]);
    // Ahora debe ser tipo text
    expect(passwordInput).toHaveAttribute('type', 'text');
    // Click para ocultar
    fireEvent.click(buttons[0]);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('debe llamar a onSubmit al enviar el formulario', () => {
    const { container } = render(<FormUserFields />);
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
