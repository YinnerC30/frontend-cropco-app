import { FormProps } from '@/modules/core/interfaces';
import { FormClientButtons } from './FormClientButtons';
import { FormClientProvider } from './FormClientContext';
import { FormClientFields } from './FormClientFields';
import { FormClientScrollArea } from './FormClientScrollArea';

export const FormClient = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormClientProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormClientScrollArea>
          <FormClientFields />
        </FormClientScrollArea>
        <FormClientButtons />
      </div>
    </FormClientProvider>
  );
};

export default FormClient;
