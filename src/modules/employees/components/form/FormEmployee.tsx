import { FormProps } from '@/modules/core/interfaces';
import { FormEmployeeButtons } from './FormEmployeeButtons';
import { FormEmployeeProvider } from './FormEmployeeContext';
import { FormEmployeeFields } from './FormEmployeeFields';
import { FormEmployeeScrollArea } from './FormEmployeeScrollArea';

export const FormEmployee = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormEmployeeProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormEmployeeScrollArea>
          <FormEmployeeFields />
        </FormEmployeeScrollArea>
        <FormEmployeeButtons />
      </div>
    </FormEmployeeProvider>
  );
};

export default FormEmployee;
