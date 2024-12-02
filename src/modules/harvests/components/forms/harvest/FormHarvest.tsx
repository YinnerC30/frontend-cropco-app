import { FormProps } from '@/modules/core/interfaces';
import { FormHarvestButtons } from './FormHarvestButtons';
import { FormHarvestProvider } from './FormHarvestContext';
import { FormHarvestFields } from './FormHarvestFields';
import { FormHarvestScrollArea } from './FormHarvestScrollArea';

export const FormHarvest = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  console.log(defaultValues);
  return (
    <FormHarvestProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <FormHarvestScrollArea>
          <FormHarvestFields />
        </FormHarvestScrollArea>
        <FormHarvestButtons />
      </div>
    </FormHarvestProvider>
  );
};

export default FormHarvest;
