import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormHarvestButtons } from './FormHarvestButtons';
import { FormHarvestProvider } from './FormHarvestContext';
import { FormHarvestFields } from './FormHarvestFields';

export const FormHarvest = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormHarvestProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormHarvestFields />
        </ScrollArea>

        <FormHarvestButtons />
      </div>
    </FormHarvestProvider>
  );
};

export default FormHarvest;
