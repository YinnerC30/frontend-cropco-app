import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormEmployeeButtons } from './FormEmployeeButtons';
import { FormEmployeeProvider } from './FormEmployeeContext';
import { FormEmployeeFields } from './FormEmployeeFields';

export const FormEmployee: React.FC<FormProps> = ({
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
        <ScrollArea className="h-[72vh] w-full pb-2">
          <FormEmployeeFields />
        </ScrollArea>
        <FormEmployeeButtons />
      </div>
    </FormEmployeeProvider>
  );
};

export default FormEmployee;
