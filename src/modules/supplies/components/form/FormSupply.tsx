import { FormProps } from '@/modules/core/interfaces';
import { FormSupplyButtons } from './FormSupplyButtons';
import { FormSupplyProvider } from './FormSupplyContext';
import { FormSupplyFields } from './FormSupplyFields';
import { FormSupplyScrollArea } from './FormSupplyScrollArea';

export const FormSupply = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormSupplyProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormSupplyScrollArea>
          <FormSupplyFields />
        </FormSupplyScrollArea>
        <FormSupplyButtons />
      </div>
    </FormSupplyProvider>
  );
};

export default FormSupply;
