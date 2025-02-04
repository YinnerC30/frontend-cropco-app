import { useCreateForm } from '../../hooks';

export interface FormContextProps {
  form: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
}
