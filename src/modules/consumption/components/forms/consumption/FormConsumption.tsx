import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormConsumptionButtons } from './FormConsumptionButtons';
import { FormConsumptionProvider } from './FormConsumptionContext';
import { FormConsumptionFields } from './FormConsumptionFields';

export const FormConsumption = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormConsumptionProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormConsumptionFields />
        </ScrollArea>
        <FormConsumptionButtons />
      </div>
    </FormConsumptionProvider>
  );
};

export default FormConsumption;
