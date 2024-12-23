export interface FormProps<TValuesSubmit, TDefaultValues> {
  onSubmit?: (values: TValuesSubmit) => void | undefined;
  isSubmitting?: boolean;
  defaultValues?: TDefaultValues;
  readOnly?: boolean;
}
