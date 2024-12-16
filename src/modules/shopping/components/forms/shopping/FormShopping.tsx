import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormShoppingButtons } from './FormShoppingButtons';
import { FormShoppingProvider } from './FormShoppingContext';
import { FormShoppingFields } from './FormShoppingFields';

export const FormShopping = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormShoppingProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormShoppingFields />
        </ScrollArea>
        <FormShoppingButtons />
      </div>
    </FormShoppingProvider>
  );
};

export default FormShopping;
