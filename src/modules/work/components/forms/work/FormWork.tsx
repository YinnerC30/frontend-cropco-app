import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormWorkButtons } from './FormWorkButtons';
import { FormWorkProvider } from './FormWorkContext';
import { FormWorkFields } from './FormWorkFields';

export const FormWork = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormWorkProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormWorkFields />
        </ScrollArea>
        <FormWorkButtons />
      </div>
    </FormWorkProvider>
  );
};

export default FormWork;
