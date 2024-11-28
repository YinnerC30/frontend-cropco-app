import { FormSupplierAlert } from './FormSupplierAlert';
import { FormSupplierButtons } from './FormSupplierButtons';
import { FormSupplierProvider } from './FormSupplierContext';
import { FormSupplierFields } from './FormSupplierFields';
import { FormSupplierScrollArea } from './FormSupplierScrollArea';

export const FormSupplier = ({
  defaultValues,

  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: any) => {
  console.log(defaultValues);
  return (
    <FormSupplierProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormSupplierScrollArea>
          <FormSupplierAlert />
          <FormSupplierFields />
        </FormSupplierScrollArea>
        <FormSupplierButtons />
      </div>
    </FormSupplierProvider>
  );
};

export default FormSupplier;
