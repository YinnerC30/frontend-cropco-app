import { ScrollArea } from '@/components';
import { FormProps } from '@/modules/core/interfaces';
import { FormSaleButtons } from './FormSaleButtons';
import { FormSaleProvider } from './FormSaleContext';
import { FormSaleFields } from './FormSaleFields';

export const FormSale = ({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  return (
    <FormSaleProvider
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <ScrollArea className={`h-[72vh] w-full pr-2`}>
          <FormSaleFields />
        </ScrollArea>
        <FormSaleButtons />
      </div>
    </FormSaleProvider>
  );
};

export default FormSale;
